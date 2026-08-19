import * as z from "zod";
import { Gender } from "@/model/User";


export const registerUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50),

  lastName: z
    .string()
    .trim()
    .max(50)
    .optional(),

  email: z
    .string()
    .trim()
    .email("Invalid email")
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  gender: z.enum([
    Gender.MALE,
    Gender.FEMALE,
    Gender.OTHER,
    Gender.PREFER_NOT_TO_SAY,
  ]),

  dob: z.coerce.date(),

  phone_no: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Invalid phone number"),
});