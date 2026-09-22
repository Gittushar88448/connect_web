import { NextResponse } from "next/server";

import { exchangeCodeForTokens, verifyGoogleIdToken } from "@/lib/auth/google";
import { consumeOAuthStateCookie, setAuthCookies } from "@/lib/auth/session";
import { findOrCreateGoogleUser } from "@/services/users";
import { Account, UserStatus } from "@/types/user-enums";
import { createAccessToken as signAccessToken } from "@/lib/auth/accessToken";
import { generateRefreshToken as signRefreshToken } from "@/lib/auth/refreshToken";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  function fail(message: string) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(message)}`, request.url));
  }

  if (oauthError) return fail("Google sign-in was cancelled.");
  if (!code || !state) return fail("Missing information from Google's response.");

  const expectedState = await consumeOAuthStateCookie();
  if (!expectedState || expectedState !== state) {
    return fail("Your sign-in session expired. Please try again.");
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const profile = await verifyGoogleIdToken(tokens.id_token);

    if (!profile.emailVerified) {
      return fail("Your Google account's email isn't verified.");
    }

    const user = await findOrCreateGoogleUser(profile);

    if (user.userStatus === UserStatus.SUSPENDED) {
      return fail("This account has been suspended. Contact support for help.");
    }

    const tokenPayload = { sub: user.id, account: user.account, type: user.type };
    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(tokenPayload),
      signRefreshToken(),
    ]);
    await setAuthCookies(accessToken, refreshToken);
    return NextResponse.redirect(new URL("/", request.url));
  } catch (err) {
    console.error("[api/auth/google/callback] failed:", err);
    return fail("Something went wrong signing in with Google. Please try again.");
  }
}
