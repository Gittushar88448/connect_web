import "server-only";

import dbConnect from "@/lib/dbConnect";
import { CustomSolutionRequestModel } from "@/model/CustomRequest";
import { customSolutionSchema, type CustomSolutionFormValues } from "@/lib/validations/custom-solutions";

export interface CustomRequestRecord extends CustomSolutionFormValues {
  id: string;
  status: "pending" | "accepted" | "rejected" | "appointment_booked";
  appointmentAt: string | null;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}

function serialize(doc: Record<string, unknown>): CustomRequestRecord {
  return {
    id: String(doc._id),
    contactName: doc.contactName as string,
    contactEmail: doc.contactEmail as string,
    projectTitle: doc.projectTitle as string,
    industry: doc.industry as string,
    problemDescription: doc.problemDescription as string,
    technicalRequirements: doc.technicalRequirements as string,
    integrationRequirements: doc.integrationRequirements as string[],
    expectedScale: doc.expectedScale as string,
    budgetRange: doc.budgetRange as string,
    timeline: doc.timeline as string,
    additionalRequirements: (doc.additionalRequirements as string) ?? "",
    status: doc.status as CustomRequestRecord["status"],
    attachments: Array.isArray(doc.attachments)
      ? (doc.attachments)
      : [],
    appointmentAt: doc.appointmentAt ? new Date(doc.appointmentAt as string).toISOString() : null,
    adminNote: (doc.adminNote as string) ?? "",
    createdAt: new Date(doc.createdAt as string).toISOString(),
    updatedAt: new Date(doc.updatedAt as string).toISOString(),
  };
}

export async function submitCustomRequest(
  data: CustomSolutionFormValues
): Promise<CustomRequestRecord> {
  await dbConnect();
  const doc = await CustomSolutionRequestModel.create(data);
  return serialize(doc.toObject());
}

export async function listCustomRequests(): Promise<CustomRequestRecord[]> {
  try {
    await dbConnect();
    const docs = await CustomSolutionRequestModel.find({}).sort({ createdAt: -1 }).lean();
    return docs.map((d) => serialize(d as Record<string, unknown>));
  } catch (err) {
    console.warn("[services/custom-requests] listCustomRequests failed:", (err as Error).message);
    return [];
  }
}

export async function updateCustomRequestStatus(
  id: string,
  update: { status: CustomRequestRecord["status"]; appointmentAt?: string | null; adminNote?: string }
): Promise<CustomRequestRecord | null> {
  await dbConnect();
  const doc = await CustomSolutionRequestModel.findByIdAndUpdate(
    id,
    {
      status: update.status,
      appointmentAt: update.appointmentAt ?? null,
      ...(update.adminNote !== undefined ? { adminNote: update.adminNote } : {}),
    },
    { new: true, runValidators: true }
  ).lean();
  return doc ? serialize(doc as Record<string, unknown>) : null;
}

export async function countCustomRequestsByStatus(): Promise<Record<string, number>> {
  try {
    await dbConnect();
    const results = await CustomSolutionRequestModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const counts: Record<string, number> = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      appointment_booked: 0,
    };
    for (const r of results) counts[r._id] = r.count;
    return counts;
  } catch (err) {
    console.warn(
      "[services/custom-requests] countCustomRequestsByStatus failed:",
      (err as Error).message
    );
    return { pending: 0, accepted: 0, rejected: 0, appointment_booked: 0 };
  }
}
