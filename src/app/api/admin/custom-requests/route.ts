import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { listCustomRequests } from "@/services/custom-requests";

export async function GET() {
  await requireAdmin();
  const requests = await listCustomRequests();
  return NextResponse.json({ requests });
}
