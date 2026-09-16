import { Schema, model, models } from "mongoose";

const CustomSolutionRequestSchema = new Schema(
  {
    contactName: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    projectTitle: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    problemDescription: { type: String, required: true, trim: true },
    technicalRequirements: { type: String, required: true, trim: true },
    integrationRequirements: { type: [String], required: true, default: [] },
    expectedScale: { type: String, required: true, trim: true },
    budgetRange: { type: String, required: true, trim: true },
    timeline: { type: String, required: true, trim: true },
    additionalRequirements: { type: String, trim: true, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected", "appointment_booked"],
      default: "pending",
    },
    appointmentAt: { type: Date, default: null },
    adminNote: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export const CustomSolutionRequestModel =
  models.CustomSolutionRequest || model("CustomSolutionRequest", CustomSolutionRequestSchema);