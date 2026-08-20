import mongoose, { Document, Types } from "mongoose"
import { Account, Gender } from "./User";

export interface IRevokedRegisteredUser{
    firstName: string;
    userId: Types.ObjectId;
    lastName?: string;
    email: string;
    account?: Account;
    dob: Date;
    gender: Gender;
    coinBalance?: number;
    phone_no: string;
    image?: string;
    is_deleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const revokedUserSchema = new mongoose.Schema<IRevokedRegisteredUser>({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First Name Required"]
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

    account: {
        type: String,
        enum: Object.values(Account)
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

    gender: {
        type: String,
        enum: Object.values(Gender)
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
)

const revokedRegisteredModel = 
    (mongoose.models.RevokedUser as mongoose.Model<IRevokedRegisteredUser>) ||
    mongoose.model<IRevokedRegisteredUser>("RevokedUser", revokedUserSchema);


export default revokedRegisteredModel;