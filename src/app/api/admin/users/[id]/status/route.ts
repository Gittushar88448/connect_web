import { NextResponse } from "next/server";

import { requireSuperAdmin } from "@/lib/auth/require-superadmin";
import { updateUserStatusSchema } from "@/lib/validations/admin-user";
import { updateUserStatus } from "@/services/users";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireSuperAdmin();
  const { id } = await params;

  const body = await request.json();
  const parsed = updateUserStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const user = await updateUserStatus(id, parsed.data.userStatus);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}
