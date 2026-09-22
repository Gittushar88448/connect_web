import { Suspense } from "react";
import Spinner from "../spinner";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function LoginPage() {

  const user = await getCurrentUser();
  
  if(user){
    redirect("/");
  }
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  )
}
