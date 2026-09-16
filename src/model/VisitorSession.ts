import { Schema, model, models } from "mongoose";

const VisitorSessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    firstSeenAt: { type: Date, required: true, default: Date.now },
    lastSeenAt: { type: Date, required: true, default: Date.now },
    totalActiveMs: { type: Number, required: true, default: 0 },
    pageViews: { type: Number, required: true, default: 0 },
    lastPath: { type: String, default: "/" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

export const VisitorSessionModel =
  models.VisitorSession || model("VisitorSession", VisitorSessionSchema);
