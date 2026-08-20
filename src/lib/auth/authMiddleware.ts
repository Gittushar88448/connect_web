// src/lib/auth/authMiddleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./accessToken";

export async function authenticateRequest(
  request: NextRequest
) {
  const accessToken =
    request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        {
          status: 401,
        }
      ),
    };
  }

  const payload =
    await verifyAccessToken(accessToken);

  if (!payload) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          message: "Invalid or expired access token",
        },
        {
          status: 401,
        }
      ),
    };
  }

  return {
    authenticated: true,
    payload,
    response: null,
  };
}