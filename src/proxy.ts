import {
  NextRequest,
  NextResponse,
} from "next/server";

import { hasPermission } from "@/lib/auth/acl";
import { getRequiredPermission } from "@/lib/auth/routePermissions";
import { verifyAccessToken } from "@/lib/auth/accessToken";

export async function proxy(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  // Find permission required by this route
  const requiredPermission =
    getRequiredPermission(method, pathname);

  // Route doesn't require authentication
  if (!requiredPermission) {
    return NextResponse.next();
  }

  // Get access token
  const accessToken =
    request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required",
      },
      { status: 401 }
    );
  }

  // Verify access token
  const payload =
    await verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired access token",
      },
      { status: 401 }
    );
  }

  // Check ACL
  const allowed = hasPermission(
    payload.account,
    requiredPermission
  );

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "You don't have permission to access this resource",
      },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};