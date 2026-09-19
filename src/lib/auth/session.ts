import { cookies } from "next/headers";

import {
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    ACCESS_USER_PROFILE,
    REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "./constants";

export async function setUserProfile(user: object) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_USER_PROFILE, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge:
            REFRESH_TOKEN_EXPIRES_IN_DAYS *
            24 *
            60 *
            60,
    });
}

export async function deleteUserProfileFromCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_USER_PROFILE);
}

export async function clearAccessTokenCookie() {
    const cookieStore = await cookies();
    if(cookieStore.has(ACCESS_TOKEN_COOKIE)){
        cookieStore.delete(ACCESS_TOKEN_COOKIE);
    }
    return;
}

export async function getUserProfileFromCookie() {

    const cookieStore = await cookies();
    return cookieStore.get(
        ACCESS_USER_PROFILE
    )?.value;
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
            10 *
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