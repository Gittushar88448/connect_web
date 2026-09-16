import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { moduleSchema } from "@/lib/validations/moduleValidations";
import { deleteModule, getModuleById, updateModule } from "@/services/modules_ops";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const module_ = await getModuleById(id);
  if (!module_) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }
  return NextResponse.json({ module: module_ });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const body = await request.json();
  const parsed = moduleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const module_ = await updateModule(id, parsed.data);
    if (!module_) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }
    return NextResponse.json({ module: module_ });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const deleted = await deleteModule(id);
  if (!deleted) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
