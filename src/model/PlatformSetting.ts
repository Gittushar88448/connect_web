import mongoose, { Document, Schema } from "mongoose";

// Eventually we will implement it after Complete website created
// related to Coin Transaction Model

export interface ICoinSettings {
  enabled: boolean;

  // Example:
  // ₹100 spent = 10 coins
  amountUnit: number;
  coinsPerUnit: number;

  // Example:
  // 1 coin = ₹0.50 discount
  coinValue: number;

  maxCoinsPerOrder?: number;
  minimumOrderValueForCoins?: number;

  allowCouponCombination: boolean;
}

export interface IPlatformSettings extends Document {
  coinSettings: ICoinSettings;

  currency: string;

  storeName: string;

  createdAt: Date;
  updatedAt: Date;
}

const platformSettingsSchema = new Schema<IPlatformSettings>(
  {
    coinSettings: {
      enabled: {
        type: Boolean,
        default: true,
      },

      amountUnit: {
        type: Number,
        required: true,
        min: 1,
        default: 100,
      },

      coinsPerUnit: {
        type: Number,
        required: true,
        min: 0,
        default: 10,
      },

      coinValue: {
        type: Number,
        required: true,
        min: 0,
        default: 0.5,
      },

      maxCoinsPerOrder: {
        type: Number,
        min: 0,
      },

      minimumOrderValueForCoins: {
        type: Number,
        min: 0,
      },

      allowCouponCombination: {
        type: Boolean,
        default: false,
      },
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    storeName: {
      type: String,
      default: "Connect Hub",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlatformSettingsModel =
  (mongoose.models.PlatformSettings as mongoose.Model<IPlatformSettings>) ||
  mongoose.model<IPlatformSettings>(
    "PlatformSettings",
    platformSettingsSchema
  );

export default PlatformSettingsModel;