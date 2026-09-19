import "server-only";

import UserModel, { Account, Gender, UserStatus } from "@/model/User";
import type { SignupApiInput } from "@/lib/validations/auth";
import type { AdminCreateUserInput, AdminUpdateUserInput } from "@/lib/validations/admin-user";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  account: Account;
  userStatus: UserStatus;
  type: number;
  is_verified: boolean;
  gender: Gender | null;
  dob: string | null;
  phone_no: string;
  image: string;
  coinBalance: number;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// admin has type 1, superadmin has type 0, customer has type 2 — kept in
// sync here rather than trusted from the client, since `type` is what a
// lot of legacy checks might key off, but `account` is the source of truth.
function accountToType(account: Account): number {
  switch (account) {
    case Account.SUPERADMIN:
      return 0;
    case Account.ADMIN:
      return 1;
    default:
      return 2;
  }
}

type UserData = {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  account: Account;
  userStatus: UserStatus;
  type?: number;
  is_verified?: boolean;
  is_deleted?: boolean;
  gender: Gender;
  dob: Date;
  coinBalance?: number;
  phone_no: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(doc: UserData): UserRecord {
  return {
    id: String(doc._id),
    firstName: doc.firstName as string,
    lastName: (doc.lastName as string) ?? "",
    email: doc.email as string,
    account: doc.account as Account,
    userStatus: doc.userStatus as UserStatus,
    type: (doc.type as number) ?? accountToType(doc.account as Account),
    is_verified: Boolean(doc.is_verified),
    gender: (doc.gender as Gender) ?? null,
    dob: doc.dob ? new Date(doc.dob).toISOString() : null,
    phone_no: (doc.phone_no as string) ?? "",
    image: (doc.image as string) ?? "",
    coinBalance: (doc.coinBalance as number) ?? 0,
    is_deleted: Boolean(doc?.is_deleted),
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}

export async function findUserByEmail(email: string) {
  await dbConnect();
  return UserModel.findOne({ email: email.toLowerCase() }).lean();
}

/** Superadmin creating a user directly, with a chosen role. */
export async function createUserByAdmin(data: AdminCreateUserInput): Promise<UserRecord> {
  await dbConnect();
  const existing = await UserModel.findOne({ email: data.email }).lean();
  if (existing) {
    throw new Error("An account with this email already exists");
  }
  const doc = await UserModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    account: data.account,
    type: accountToType(data.account),
    phone_no: data.phone_no,
    gender: data.gender,
    dob: data.dob ? new Date(data.dob) : undefined,
    userStatus: UserStatus.ACTIVE,
  });
  return serialize(doc.toObject());
}

export async function updateUserDetails(
  id: string,
  data: AdminUpdateUserInput
): Promise<UserRecord | null> {
  await dbConnect();
  const doc = await UserModel.findByIdAndUpdate(
    id,
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone_no: data.phone_no,
      gender: data.gender,
      dob: data.dob ? new Date(data.dob) : undefined,
    },
    { new: true, runValidators: true }
  ).lean();
  return doc ? serialize(doc) : null;
}

/** The role-change dropdown — keeps `type` in sync with `account`. */
export async function updateUserAccount(
  id: string,
  account: Account
): Promise<UserRecord | null> {
  await dbConnect();
  const doc = await UserModel.findByIdAndUpdate(
    id,
    {
      $set: { account, type: accountToType(account) },
    },
    { new: true, runValidators: true }
  ).lean();
  return doc ? serialize(doc) : null;
}

/** Enable/disable — toggles between ACTIVE and SUSPENDED. */
export async function updateUserStatus(
  id: string,
  userStatus: UserStatus
): Promise<UserRecord | null> {
  await dbConnect();
  const doc = await UserModel.findByIdAndUpdate(
    id,
    { userStatus },
    { new: true, runValidators: true }
  ).lean();
  return doc ? serialize(doc) : null;
}

export async function listUsers(): Promise<UserRecord[]> {
  try {
    await dbConnect();
    const docs = await UserModel.find({ is_deleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map((d) => serialize(d));
  } catch (err) {
    console.warn("[services/users] listUsers failed:", (err as Error).message);
    return [];
  }
}

export async function countUsers(): Promise<number> {
  try {
    await dbConnect();
    return await UserModel.countDocuments({ is_deleted: { $ne: true } });
  } catch (err) {
    console.warn("[services/users] countUsers failed:", (err as Error).message);
    return 0;
  }
}
