import { z } from "zod";

export const moduleIconOptions = [
  "Users",
  "Contact",
  "BellRing",
  "BrainCircuit",
  "Package",
  "Receipt",
  "BarChart3",
  "Workflow",
] as const;

export const moduleColorOptions = ["teal", "amber", "slate"] as const;

export const moduleSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  tagline: z.string().trim().min(5, "Tagline must be at least 5 characters"),
  description: z.string().trim().min(20, "Add a bit more detail (at least 20 characters)"),
  icon: z.enum(moduleIconOptions),
  tag: z.string().trim().min(2, "Tag is required"),
  color: z.enum(moduleColorOptions),
  features: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one feature")
    .max(8, "Keep it to 8 features or fewer"),
  isActive: z.boolean(),
  order: z.number().int().default(0),
});

export type ModuleFormValues = z.infer<typeof moduleSchema>;
