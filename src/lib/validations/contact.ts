import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),

  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject")
    .max(150, "Subject is too long"),

  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters")
    .max(5000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactTopics = [
  "General inquiry",
  "Sales",
  "Support",
  "Partnership",
  "Careers",
];
