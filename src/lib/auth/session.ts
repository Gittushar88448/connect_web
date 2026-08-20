import { cookies } from "next/headers";

import {
    REFRESH_TOKEN_COOKIE,
    REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "./constants";

export async function setAccessTokenCookie(
    token: string
) {

    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, {
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

            path: "/api/auth",

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