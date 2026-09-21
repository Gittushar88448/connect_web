"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
  useEffect,
} from "react";

import {
  apiFetch,
  refreshAccessToken,
} from "@/lib/auth/fetchApi";

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  account: string;
  userStatus: string;
  coinBalance: number;
  image?: string;
};

type AuthStatus =
  | "authenticated"
  | "unauthenticated";

type AuthContextType = {
  user: User | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export function AuthProvider({
  children,
  initialUser,
  initialHasSession,
}: {
  children: ReactNode;
  initialUser: User | null;
  initialHasSession: boolean;
}) {
  const [user, setUserState] =
    useState<User | null>(
      initialUser
    );

  const [status, setStatus] =
    useState<AuthStatus>(
      initialHasSession
        ? "authenticated"
        : "unauthenticated"
    );

  const setUser = useCallback(
    (nextUser: User | null) => {
      setUserState(nextUser);
      setStatus(
        nextUser
          ? "authenticated"
          : "unauthenticated"
      );
    },
    []
  );

  const mePromiseRef =
    useRef<Promise<boolean> | null>(
      null
    );


  useEffect(() => {
    if (!initialHasSession) {
      return;
    }

    const interval =
      window.setInterval(
        () => {
          void refreshAccessToken();
        },
        9 * 60 * 1000
      );

    return () =>
      window.clearInterval(
        interval
      );
  }, [initialHasSession]);


  useEffect(() => {
    function handleSessionExpired() {
      setUserState(null);
      setStatus(
        "unauthenticated"
      );

      window.location.assign(
        "/login"
      );
    }

    window.addEventListener(
      "auth:session-expired",
      handleSessionExpired
    );

    return () => {
      window.removeEventListener(
        "auth:session-expired",
        handleSessionExpired
      );
    };
  }, []);

  const refreshUser =
    useCallback(async () => {
      if (mePromiseRef.current) {
        return mePromiseRef.current;
      }

      const promise =
        (async () => {
          try {
            const response =
              await apiFetch(
                "/api/auth/me"
              );

            if (!response.ok) {
              setUser(null);
              return false;
            }

            const data =
              await response.json();

            if (!data?.user) {
              setUser(null);
              return false;
            }

            setUser(data.user);
            return true;
          } catch (error) {
            console.error(
              "Failed to refresh user:",
              error
            );

            setUser(null);
            return false;
          }
        })();

      mePromiseRef.current =
        promise;

      try {
        return await promise;
      } finally {
        mePromiseRef.current =
          null;
      }
    }, [setUser]);

  const logout =
    useCallback(async () => {
      try {
        await apiFetch(
          "/api/auth/logout",
          {
            method: "POST",
            retry: false,
          }
        );
      } catch (error) {
        console.error(
          "Logout failed:",
          error
        );
      } finally {
        setUser(null);
      }
    }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated:
          status ===
            "authenticated" &&
          !!user,
        setUser,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}