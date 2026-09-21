import "server-only";

import { getAccessTokenCookie } from "@/lib/auth/session";
import { verifyAccessToken } from "@/lib/auth/accessToken";
import { getUserById } from "@/services/users";
import { UserStatus } from "@/types/user-enums";
import type { UserRecord } from "@/services/users";

export async function getCurrentUser(): Promise<UserRecord | null> {
  const token = await getAccessTokenCookie();
  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  const user = await getUserById(payload.sub);
  if (!user || user.userStatus === UserStatus.SUSPENDED) return null;

  return user;
}
