import { Suspense } from "react";
import Spinner from "../spinner";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner/>}>
        <LoginForm/>
    </Suspense>
  )
}
