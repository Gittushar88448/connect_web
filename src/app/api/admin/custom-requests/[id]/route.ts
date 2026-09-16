import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { updateRequestStatusSchema } from "@/lib/validations/custom-solutions";
import { updateCustomRequestStatus } from "@/services/custom-requests";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const body = await request.json();
  const parsed = updateRequestStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const record = await updateCustomRequestStatus(id, parsed.data);
  if (!record) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }
  return NextResponse.json({ request: record });
}
