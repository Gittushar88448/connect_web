import {
  ContactModel,
} from "@/model/Contact";
import type {
  ContactFormValues,
} from "@/lib/validations/contact";
import dbConnect from "@/lib/dbConnect";

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}

function serialize(
  doc: Record<string, unknown>
): ContactRecord {
  return {
    id: String(doc._id),
    name: doc.name as string,
    email: doc.email as string,
    subject: doc.subject as string,
    message: doc.message as string,
    status:
      doc.status as ContactRecord["status"],
    adminNote:
      (doc.adminNote as string) ?? "",

    createdAt: new Date(
      doc.createdAt as string | Date
    ).toISOString(),

    updatedAt: new Date(
      doc.updatedAt as string | Date
    ).toISOString(),
  };
}

export async function createContact(
  data: ContactFormValues
): Promise<ContactRecord> {
  await dbConnect();

  const doc = await ContactModel.create({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  return serialize(doc.toObject());
}