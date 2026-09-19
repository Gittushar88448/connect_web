import { NextResponse } from "next/server";

import { requireSuperAdmin } from "@/lib/auth/require-superadmin";
import { adminCreateUserSchema } from "@/lib/validations/admin-user";
import { createUserByAdmin, listUsers } from "@/services/users";

export async function GET() {
  await requireSuperAdmin();
  const users = await listUsers();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  await requireSuperAdmin();

  const body = await request.json();
  const parsed = adminCreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const user = await createUserByAdmin(parsed.data);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}
