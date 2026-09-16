import { NextResponse } from "next/server";

import { customSolutionSchema } from "@/lib/validations/custom-solutions";
import { submitCustomRequest } from "@/services/custom-requests";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = customSolutionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const record = await submitCustomRequest(parsed.data);
    return NextResponse.json({ request: record }, { status: 201 });
  } catch (err) {
    console.error("[api/custom-requests] submit failed:", err);
    return NextResponse.json(
      { error: "Could not submit your request. Please try again." },
      { status: 500 }
    );
  }
}
