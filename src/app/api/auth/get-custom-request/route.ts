import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { CustomSolutionRequestModel } from "@/model/CustomRequest";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();

    const result = await CustomSolutionRequestModel.findOne({
      contactEmail: user.email,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!result) {
      return NextResponse.json(
        {
          result: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      result: {
        id: String(result._id),
        contactName: result.contactName,
        contactEmail: result.contactEmail,
        projectTitle: result.projectTitle,
        industry: result.industry,
        problemDescription: result.problemDescription,
        technicalRequirements: result.technicalRequirements,
        integrationRequirements: result.integrationRequirements,
        expectedScale: result.expectedScale,
        budgetRange: result.budgetRange,
        timeline: result.timeline,
        additionalRequirements:
          result.additionalRequirements ?? "",
        status: result.status,
        appointmentAt: result.appointmentAt,
        adminNote: result.adminNote ?? "",
        attachments: result.attachments ?? [],
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      "[GET /api/auth/get-custom-request] failed:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch custom request",
      },
      { status: 500 }
    );
  }
}