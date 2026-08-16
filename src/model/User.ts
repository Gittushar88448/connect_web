import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export enum Account {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    CUSTOMER = "Customer",
}

export interface User extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    account: Account;
    type?: number;
    is_verified?: boolean;
    gender: string;
    dob: string;
    phone_no: string;
    image?: string;
    token?: string;
    is_deleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<User> = new mongoose.Schema(
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
            required: [true, "Gender is required"],
            trim: true,
        },

        dob: {
            type: String,
            required: [true, "Date of birth is required"],
        },

        phone_no: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        token: {
            type: String,
            default: ""
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

userSchema.pre("save", async function () : Promise<any> {
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
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", userSchema);

export default UserModel;