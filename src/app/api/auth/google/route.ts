import { NextResponse } from "next/server";

import { getGoogleAuthUrl } from "@/lib/auth/google";
import { setOAuthStateCookie } from "@/lib/auth/session";

export async function GET(request: Request) {
  const state = crypto.randomUUID();
  await setOAuthStateCookie(state);

  try {
    return NextResponse.redirect(getGoogleAuthUrl(state));
  } catch (err) {
    const message = encodeURIComponent((err as Error).message);
    return NextResponse.redirect(new URL(`/login?error=${message}`, request.url));
  }
}
