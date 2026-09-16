import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { moduleSchema } from "@/lib/validations/moduleValidations";
import { createModule, listModules } from "@/services/modules_ops";

export async function GET() {
  await requireAdmin();
  const modules = await listModules();
  return NextResponse.json({ modules });
}

export async function POST(request: Request) {
  await requireAdmin();

  const body = await request.json();
  const parsed = moduleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const module_ = await createModule(parsed.data);
    return NextResponse.json({ module: module_ }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}
