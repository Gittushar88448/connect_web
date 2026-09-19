import { Suspense } from "react";
import Spinner from "../spinner";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";

export default async function LoginPage() {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  const refreshToken =
    cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (
    accessToken &&
    refreshToken
  ) {
    redirect("/");
  }

  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  )
}
