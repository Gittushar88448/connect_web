import { Schema, model, Model, models, type InferSchemaType } from "mongoose";

const ModuleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    color: {
      type: String,
      required: true,
      enum: ["teal", "amber", "slate"],
      default: "teal",
    },
    features: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one feature is required",
      },
    },
    isActive: { type: Boolean, required: true, default: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export type ModuleDocument = InferSchemaType<typeof ModuleSchema>;
export const ModuleModel = (models.ModuleSchema as Model<ModuleDocument>) ||
  model(
     "Module",
     ModuleSchema
   );
