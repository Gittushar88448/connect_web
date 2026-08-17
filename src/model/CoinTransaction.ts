import mongoose, { Document, Schema, Types } from "mongoose";

// Eventually we will implement it after Complete website created

export enum CoinTransactionType {
  EARNED = "earned",
  REDEEMED = "redeemed",
  REFUNDED = "refunded",
  ADJUSTED = "adjusted",
}

export interface ICoinTransaction extends Document {
  user: Types.ObjectId;

  type: CoinTransactionType;

  amount?: number;

  balanceAfter: number;

  order?: Types.ObjectId;

  description?: string;

  createdBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const coinTransactionSchema = new Schema<ICoinTransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: Object.values(CoinTransactionType),
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },

    description: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const CoinTransactionModel =
  (mongoose.models.CoinTransaction as mongoose.Model<ICoinTransaction>) ||
  mongoose.model<ICoinTransaction>(
    "CoinTransaction",
    coinTransactionSchema
  );

export default CoinTransactionModel;