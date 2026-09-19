// src/app/api/auth/me/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        const accessToken = cookieStore.get(
            ACCESS_TOKEN_COOKIE
        )?.value;

        if (!accessToken) {
            return NextResponse.json(
                {
                    authenticated: false,
                    user: null,
                },
                { status: 401 }
            );
        }

        const response = await fetch(
            "/api/auth/me",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                {
                    authenticated: false,
                    user: null,
                },
                { status: response.status }
            );
        }

        const user = await response.json();

        return NextResponse.json({
            authenticated: true,
            user,
        });
    } catch (error) {
        console.error("ME route failed:", error);

        return NextResponse.json(
            {
                authenticated: false,
                user: null,
            },
            { status: 500 }
        );
    }
}