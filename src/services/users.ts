import "server-only";

import dbConnect  from "@/lib/dbConnect";
import UserModel, { Account, Gender, UserStatus, IUser } from "@/model/User";

export interface UserRecord {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  account: Account;
  userStatus: UserStatus;
  type?: number;
  is_verified?: boolean;
  gender: Gender;
  dob: string;
  coinBalance: number;
  phone_no: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

function serialize(doc: IUser): UserRecord {
  return {
    id: doc._id.toString(),

    firstName: doc.firstName,

    lastName: doc.lastName,

    email: doc.email,

    account: doc.account,

    userStatus: doc.userStatus,

    type: doc.type,

    is_verified: Boolean(doc.is_verified),

    gender: doc.gender,

    dob: doc.dob?.toISOString() || "",

    coinBalance: doc.coinBalance ?? 0,

    phone_no: doc.phone_no,

    image: doc.image,

    createdAt: doc.createdAt.toISOString(),

    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function findUserByEmail(email: string) {
  await dbConnect();
  return UserModel.findOne({ email: email.toLowerCase() }).lean();
}


export async function listUsers(): Promise<UserRecord[]> {
  try {
    await dbConnect();

    const docs = await UserModel
      .find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return docs.map((doc) =>
      serialize(doc as unknown as IUser)
    );
  } catch (err) {
    console.warn(
      "[services/users] listUsers failed:",
      err instanceof Error ? err.message : err
    );

    return [];
  }
}

export async function countUsers(): Promise<number> {
  try {
    await dbConnect();
    return await UserModel.countDocuments({});
  } catch (err) {
    console.warn("[services/users] countUsers failed:", (err as Error).message);
    return 0;
  }
}
