import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  hasPermission,
} from "@/lib/auth/acl";

import {
  getRequiredPermission,
} from "@/lib/auth/routePermissions";

import {
  createAccessToken,
  verifyAccessToken,
} from "@/lib/auth/accessToken";

import {
  rotateRefreshToken,
} from "@/services/refresh-token";

import { clearAccessTokenCookie, clearRefreshTokenCookie, getAccessTokenCookie, getRefreshTokenCookie, setAccessTokenCookie, setRefreshTokenCookie } from "./lib/auth/session";

async function setAuthCookiesOnResponse(
  accessToken: string,
  refreshToken: string
) {
  await setAccessTokenCookie(accessToken);
  await setRefreshTokenCookie(refreshToken)
}

async function clearAuthCookiesOnResponse() {
  await clearAccessTokenCookie();
  await clearRefreshTokenCookie();
}

async function refreshFromCookie() {
  const rawRefreshToken =
    await getRefreshTokenCookie();

  if (!rawRefreshToken) {
    return null;
  }

  const rotated =
    await rotateRefreshToken(
      rawRefreshToken
    );

  if (!rotated) {
    return null;
  }

  const accessToken =
    await createAccessToken({
      sub: rotated.user.id,
      account:
        rotated.user.account,
      type:
        rotated.user.type,
    });

  /*
   * Make new tokens available to the
   * current request.
   */
  await setAccessTokenCookie(accessToken);
  await setRefreshTokenCookie(rotated.refreshToken);

  return {
    accessToken,
    refreshToken:
      rotated.refreshToken,
  };
}

const PUBLIC_API_ROUTES = new Set([
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/google",
  "/api/auth/callback/google",
  "/api/analytics/heartbeat",
]);

export async function proxy(
  request: NextRequest
) {
  const {
    pathname,
    search,
  } = request.nextUrl;

  const method =
    request.method;

  const isApiRequest =
    pathname.startsWith(
      "/api/"
    );

  const isProtectedPage =
    pathname === "/admin" ||
    pathname.startsWith(
      "/admin/"
    ) ||
    pathname === "/account" ||
    pathname.startsWith(
      "/account/"
    );

  if (PUBLIC_API_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  let rotatedTokens:
    | {
      accessToken: string;
      refreshToken: string;
    }
    | null = null;

  const accessToken =
    await getAccessTokenCookie()
  if (
    !accessToken ||
    !(await verifyAccessToken(
      accessToken
    ))
  ) {
    rotatedTokens =
      await refreshFromCookie();

    if (!rotatedTokens) {
      if (
        !isProtectedPage &&
        !isApiRequest
      ) {
        return NextResponse.next();
      }

      if (isApiRequest) {
        const response =
          NextResponse.json(
            {
              success: false,
              message:
                "Authentication required",
            },
            { status: 401 }
          );

        clearAuthCookiesOnResponse();

        return response;
      }

      /*
       * Protected pages go to login.
       */
      const loginUrl =
        new URL(
          "/login",
          request.url
        );

      loginUrl.searchParams.set(
        "next",
        `${pathname}${search}`
      );

      const response =
        NextResponse.redirect(
          loginUrl
        );

      clearAuthCookiesOnResponse();

      return response;
    }
  }

  /*
   * API ACL.
   */
  const requiredPermission =
    getRequiredPermission(
      method,
      pathname
    );

  /*
   * /admin and /account pages
   * don't get their final authorization
   * decision here.
   *
   * Their Server Component guard
   * performs the database-backed check.
   */
  if (!requiredPermission) {
    const response =
      NextResponse.next({
        request,
      });

    if (rotatedTokens) {
      setAuthCookiesOnResponse(
        rotatedTokens.accessToken,
        rotatedTokens.refreshToken
      );
    }

    return response;
  }

  const currentAccessToken =
    await getAccessTokenCookie();

  if (!currentAccessToken) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Authentication required",
      },
      { status: 401 }
    );
  }

  const payload =
    await verifyAccessToken(
      currentAccessToken
    );

  if (!payload) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid or expired access token",
      },
      { status: 401 }
    );
  }

  const allowed =
    hasPermission(
      payload.account,
      requiredPermission
    );

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        message:
          "You don't have permission to access this resource",
      },
      { status: 403 }
    );
  }

  const response =
    NextResponse.next({
      request,
    });

  if (rotatedTokens) {
    setAuthCookiesOnResponse(
      rotatedTokens.accessToken,
      rotatedTokens.refreshToken
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/auth/me",
    "/api/auth/refresh",
    "/api/auth/logout",
  ],
};