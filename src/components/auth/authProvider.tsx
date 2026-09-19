"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";

import { apiFetch } from "@/lib/auth/fetchApi";

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
  createContext<AuthContextType | undefined>(
    undefined
  );

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
    useState<User | null>(initialUser);

  const [status, setStatus] =
    useState<AuthStatus>(
      initialHasSession
        ? "authenticated"
        : "unauthenticated"
    );


  const mePromiseRef =
    useRef<Promise<boolean> | null>(null);

  const setUser = useCallback(
    (nextUser: User | null) => {
      setUserState(nextUser);

      if (nextUser) {
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    },
    []
  );

  const refreshUser = useCallback(async () => {
    if (mePromiseRef.current) {
      return mePromiseRef.current;
    }

    const promise = (async () => {
      try {
        const response = await apiFetch(
          "/api/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setUserState(null);
          setStatus("unauthenticated");

          return false;
        }

        const data = await response.json();

        if (!data?.user) {
          setUserState(null);
          setStatus("unauthenticated");

          return false;
        }

        /*
         * /me returned a valid user.
         */
        setUserState(data.user);
        setStatus("authenticated");

        return true;
      } catch (error) {
        console.error(
          "Failed to refresh user:",
          error
        );

        setUserState(null);
        setStatus("unauthenticated");

        return false;
      }
    })();

    mePromiseRef.current = promise;

    try {
      return await promise;
    } finally {
      mePromiseRef.current = null;
    }
  }, []);

  /*
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
        retry: false,
      });
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      /*
       * Clear React auth state immediately.
       */
      setUserState(null);
      setStatus("unauthenticated");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,

        isAuthenticated:
          status === "authenticated" &&
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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

