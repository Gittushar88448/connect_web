import { NextResponse } from "next/server";
import { z } from "zod";

import { recordHeartbeat } from "@/services/visitor-sessions";

const heartbeatSchema = z.object({
  sessionId: z.string().min(1).max(100),
  deltaMs: z.number().min(0),
  path: z.string().min(1).max(300),
  isNewPageView: z.boolean(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = heartbeatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await recordHeartbeat({
    ...parsed.data,
    userAgent: request.headers.get("user-agent") ?? "",
  });

  return NextResponse.json({ ok: true });
}
