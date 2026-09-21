import { cookies } from "next/headers";

import {
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    OAUTH_STATE_COOKIE,
    REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "./constants";

const ACCESS_MAX_AGE = 10 * 60; // 10 minutes, matches the access token TTL
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60; // 30 days, matches the refresh token TTL


export async function clearAccessTokenCookie() {
    const cookieStore = await cookies();
    if(cookieStore.has(ACCESS_TOKEN_COOKIE)){
        cookieStore.delete(ACCESS_TOKEN_COOKIE);
    }
    return;
}

export async function setAccessTokenCookie(
    token: string
) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, token, {
        httpOnly: true,

        secure:
            process.env.NEXT_ENV ===
            "production",

        sameSite: "lax",

        path: "/",
        maxAge:
            10*
            60,
    }
    );
}

export async function setRefreshTokenCookie(
    token: string
) {
    const cookieStore = await cookies();
    cookieStore.set(
        REFRESH_TOKEN_COOKIE,
        token,
        {
            httpOnly: true,

            secure:
                process.env.NEXT_ENV ===
                "production",

            sameSite: "lax",

            path: "/",

            maxAge:
                REFRESH_TOKEN_EXPIRES_IN_DAYS *
                24 *
                60 *
                60,
        }
    );
}

export async function clearRefreshTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(
        REFRESH_TOKEN_COOKIE
    );
}

export async function getRefreshTokenCookie() {
    const cookieStore = await cookies();
    return cookieStore.get(
        REFRESH_TOKEN_COOKIE
    )?.value;
}

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const store = await cookies();
  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  store.set(ACCESS_TOKEN_COOKIE, accessToken, { ...common, maxAge: ACCESS_MAX_AGE });
  store.set(REFRESH_TOKEN_COOKIE, refreshToken, { ...common, maxAge: REFRESH_MAX_AGE });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_TOKEN_COOKIE);
  store.delete(REFRESH_TOKEN_COOKIE);
}

export async function getAccessTokenCookie(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value;
}

/** Short-lived CSRF-protection cookie for the Google OAuth redirect round trip. */
export async function setOAuthStateCookie(state: string) {
  const store = await cookies();
  store.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60, // 10 minutes — long enough for the consent screen, no longer
  });
}

export async function consumeOAuthStateCookie(): Promise<string | undefined> {
  const store = await cookies();
  const value = store.get(OAUTH_STATE_COOKIE)?.value;
  store.delete(OAUTH_STATE_COOKIE);
  return value;
}
