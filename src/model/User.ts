import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export enum Account {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    CUSTOMER = "customer",
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
    PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

export enum UserStatus {
    ACTIVE = "active",
    PENDING = "pending",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
}

export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    account: Account;
    userStatus: UserStatus;
    type?: number;
    is_verified?: boolean;
    gender: Gender;
    dob: Date;
    coinBalance?: number;
    phone_no: string;
    image?: string;
    is_deleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        account: {
            type: String,
            enum: Object.values(Account),
            default: Account.CUSTOMER,
        },

        type: {
            type: Number,
            default: 2,
        },

        is_verified: {
            type: Boolean,
            default: false,
        },

        gender: {
            type: String,
            enum: Object.values(Gender)
        },

        dob: {
            type: Date,
        },

        phone_no: {
            type: String,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        userStatus: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.PENDING
        },

        coinBalance: {
            type: Number,
            default: 0,
            min: 0
        },

        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (): Promise<any> {
    if (!this.isModified("password")) {
        return;
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default UserModel;