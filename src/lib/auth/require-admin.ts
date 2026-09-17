import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants";
import { verifyAccessToken } from "@/lib/auth/accessToken";
import { isAdminAccount } from "@/lib/auth/roles";

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(
    ACCESS_TOKEN_COOKIE
  )?.value;

  // No authentication credentials.
  if (!accessToken) {
    redirect("/login");
  }

  // Verify JWT signature and expiration.
  const payload = await verifyAccessToken(accessToken);

  // Token is invalid or expired.
  if (!payload) {
    redirect("/login");
  }

  if (!isAdminAccount(payload.account, payload.type)) {
    redirect("/unauthorized");
  }
}