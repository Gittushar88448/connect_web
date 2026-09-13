import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Your name is required"),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
  company: z.string().trim().optional(),
  topic: z.string().min(1, "Select a topic"),
  message: z.string().trim().min(10, "Add a bit more detail (at least 10 characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactTopics = [
  "General inquiry",
  "Sales",
  "Support",
  "Partnership",
  "Careers",
];
