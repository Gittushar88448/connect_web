import mongoose, { Document, Schema, Types } from "mongoose";

export enum CustomRequestStatus {
  SUBMITTED = "submitted",
  REVIEWING = "reviewing",
  QUOTED = "quoted",
  APPROVED = "approved",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export interface ICustomIoTRequest extends Document {
  customer: Types.ObjectId;

  projectTitle: string;

  industry?: string;

  problemDescription: string;

  deviceRequirements?: string;

  connectivityRequirements?: string;

  expectedQuantity?: number;

  budgetRange?: string;

  expectedTimeline?: string;

  additionalRequirements?: string;

  attachments: string[];

  status: CustomRequestStatus;

  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const customIoTRequestSchema = new Schema<ICustomIoTRequest>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    projectTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    industry: {
      type: String,
      trim: true,
    },

    problemDescription: {
      type: String,
      required: true,
    },

    deviceRequirements: {
      type: String,
    },

    connectivityRequirements: {
      type: String,
    },

    expectedQuantity: {
      type: Number,
      min: 1,
    },

    budgetRange: {
      type: String,
    },

    expectedTimeline: {
      type: String,
    },

    additionalRequirements: {
      type: String,
    },

    attachments: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: Object.values(CustomRequestStatus),
      default: CustomRequestStatus.SUBMITTED,
      index: true,
    },

    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CustomIoTRequestModel =
  (mongoose.models.CustomIoTRequest as mongoose.Model<ICustomIoTRequest>) ||
  mongoose.model<ICustomIoTRequest>(
    "CustomIoTRequest",
    customIoTRequestSchema
  );

export default CustomIoTRequestModel;