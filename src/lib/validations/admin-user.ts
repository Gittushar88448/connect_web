import { z } from "zod";

import { email, password } from "@/lib/validations/auth";
import { Account, Gender, UserStatus } from "@/types/user-enums";

export const accountOptions = Object.values(Account) as [Account, ...Account[]];
export const genderOptions = Object.values(Gender) as [Gender, ...Gender[]];
export const userStatusOptions = Object.values(UserStatus) as [UserStatus, ...UserStatus[]];

/** Superadmin creating a user directly from the admin panel. */
export const adminCreateUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().optional(),
  email,
  password,
  account: z.enum(accountOptions),
  phone_no: z.string().trim().optional(),
  gender: z.enum(genderOptions).optional(),
  dob: z.string().optional(), // ISO date string from a <input type="date">
});
export type AdminCreateUserInput = z.infer<typeof adminCreateUserSchema>;

/** Editing an existing user's profile fields — not role or status. */
export const adminUpdateUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().optional(),
  email,
  phone_no: z.string().trim().optional(),
  gender: z.enum(genderOptions).optional(),
  dob: z.string().optional(),
});
export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;

/** The role-change dropdown. */
export const updateAccountRoleSchema = z.object({
  account: z.enum(accountOptions),
});

/** The enable/disable action. */
export const updateUserStatusSchema = z.object({
  userStatus: z.enum(userStatusOptions),
});
