import { NextResponse } from "next/server";

import { customSolutionSchema } from "@/lib/validations/custom-solutions";
import { submitCustomRequest } from "@/services/custom-requests";
import { sendEmail } from "@/helper/sendVerificationMail";
import customRequestSubmittedTemplate from "../../../../emails/customRequestSubmittedTemplate";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "text/csv",

  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const attachments = formData
      .getAll("attachments")
      .filter(
        (value): value is File =>
          value instanceof File && value.size > 0
      );

    if (attachments.length > MAX_FILES) {
      return NextResponse.json(
        {
          success: false,
          message: `Maximum ${MAX_FILES} files are allowed.`,
        },
        { status: 400 }
      );
    }

    for (const file of attachments) {
      if (!ALLOWED_FILE_TYPES.has(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `File type is not allowed: ${file.name}`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: `${file.name} exceeds the 10 MB file size limit.`,
          },
          { status: 400 }
        );
      }
    }

    let integrationRequirements: string[];

    try {
      const parsed = JSON.parse(
        getString(formData, "integrationRequirements")
      );

      if (
        !Array.isArray(parsed) ||
        !parsed.every((item) => typeof item === "string")
      ) {
        throw new Error("Invalid integration requirements");
      }

      integrationRequirements = parsed;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid integration requirements.",
        },
        { status: 400 }
      );
    }

    const body = {
      contactName: getString(formData, "contactName"),
      contactEmail: getString(formData, "contactEmail"),
      projectTitle: getString(formData, "projectTitle"),
      industry: getString(formData, "industry"),
      problemDescription: getString(formData, "problemDescription"),
      technicalRequirements: getString(
        formData,
        "technicalRequirements"
      ),
      integrationRequirements,
      expectedScale: getString(formData, "expectedScale"),
      budgetRange: getString(formData, "budgetRange"),
      timeline: getString(formData, "timeline"),
      additionalRequirements: getString(
        formData,
        "additionalRequirements"
      ),
    };

    const parsed = customSolutionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    /*
     * 1. Save the request first.
     */
    const record = await submitCustomRequest(
      parsed.data,
      attachments
    );

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit request.",
        },
        { status: 500 }
      );
    }

    try {
      await sendEmail({
        email: parsed.data.contactEmail,
        subject_text: "Custom Solution Request Received — Kapsinfos",
        body: customRequestSubmittedTemplate({
          name: parsed.data.contactName,
          email: parsed.data.contactEmail,
          projectTitle: parsed.data.projectTitle,
          industry: parsed.data.industry,
          expectedScale: parsed.data.expectedScale,
          budgetRange: parsed.data.budgetRange,
          timeline: parsed.data.timeline,
          integrationRequirements:
            parsed.data.integrationRequirements,
        }),
      });
    } catch (emailError) {
      console.error(
        "[api/custom-requests] confirmation email failed:",
        emailError
      );
    }

    return NextResponse.json(
      {
        success: true,
        request: record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "[api/custom-requests] submit failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Could not submit your request. Please try again.",
      },
      { status: 500 }
    );
  }
}