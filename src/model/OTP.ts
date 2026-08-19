import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
  is_deleted?: boolean
}

const otpSchema: Schema<IOTP> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    otp: {
      type: String,
      required: [true, "OTP is required"],
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
        type: Date
    },
    is_deleted:{
        type: Boolean,
        default: false
    }
  },
);

const OTPModel =
  (mongoose.models.OTP as Model<IOTP>) ||
  mongoose.model<IOTP>("OTP", otpSchema);

export default OTPModel;