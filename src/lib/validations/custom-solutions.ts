import { z } from "zod";

export const customSolutionSchema = z.object({
  projectTitle: z.string().trim().min(3, "Give your project a short title"),
  industry: z.string().min(1, "Select an industry"),
  problemDescription: z
    .string()
    .trim()
    .min(20, "Add a bit more detail (at least 20 characters)"),
  technicalRequirements: z.string().trim().min(1, "Describe the technical requirements"),
  integrationRequirements: z
    .array(z.string())
    .min(1, "Select at least one integration option"),
  expectedScale: z.string().min(1, "Select an expected scale"),
  budgetRange: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  additionalRequirements: z.string().trim().optional(),
  contactName: z.string().trim().min(1, "Your name is required"),
  attachments: z.array(z.object({
    fileName: z.string().min(1, "File name is required"),
    fileUrl: z.string().url("Invalid file URL"),
    uploadedAt: z.date().default(() => new Date()),
  })),
  contactEmail: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),
});

export type CustomSolutionFormValues = z.infer<typeof customSolutionSchema>;

export const customRequestStatuses = [
  "pending",
  "accepted",
  "rejected",
  "appointment_booked",
] as const;

export const updateRequestStatusSchema = z.object({
  status: z.enum(customRequestStatuses),
  appointmentAt: z.string().datetime().optional().nullable(),
  adminNote: z.string().trim().optional(),
});
