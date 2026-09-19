import { NextResponse } from "next/server";

import { requireSuperAdmin } from "@/lib/auth/require-superadmin";
import { updateAccountRoleSchema } from "@/lib/validations/admin-user";
import { updateUserAccount } from "@/services/users";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireSuperAdmin();
  const { id } = await params;

  const body = await request.json();
  const parsed = updateAccountRoleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const user = await updateUserAccount(id, parsed.data.account);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}
