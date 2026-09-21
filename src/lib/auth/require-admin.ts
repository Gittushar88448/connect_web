import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Account } from "@/types/user-enums";

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.account !== Account.ADMIN && user.account !== Account.SUPERADMIN) {
    redirect("/unauthorized");
  }
  return user;
}
