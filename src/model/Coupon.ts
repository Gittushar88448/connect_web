import mongoose, { Document, Schema, Types } from "mongoose";

export enum CouponDiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed",
}

export enum CouponScope {
    ALL_PRODUCTS = "all_products",
    SPECIFIC_PRODUCTS = "specific_products",
    SPECIFIC_CATEGORIES = "specific_categories",
}


export interface ICoupon extends Document {
    code: string;

    discountType: CouponDiscountType;
    discountValue: number;

    scope: CouponScope;

    products?: Types.ObjectId[];
    categories?: Types.ObjectId[];

    minimumOrderValue?: number;
    maximumDiscount?: number;

    startDate: Date;
    expiryDate: Date;

    usageLimit?: number;
    usedCount: number;

    perUserLimit?: number;

    isActive: boolean;

    createdBy: Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}


const couponSchema = new Schema<ICoupon>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        discountType: {
            type: String,
            enum: Object.values(CouponDiscountType),
            required: [true, "Discount type is required"],
        },

        discountValue: {
            type: Number,
            required: [true, "Discount Value is required"],
            min: 0,
        },

        minimumOrderValue: {
            type: Number,
            min: 0,
        },

        maximumDiscount: {
            type: Number,
            min: 0,
        },

        startDate: {
            type: Date,
            required: true,
        },

        expiryDate: {
            type: Date,
            required: true,
        },

        usageLimit: {
            type: Number,
            min: 1,
        },

        usedCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        perUserLimit: {
            type: Number,
            min: 1,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CouponModel =
    (mongoose.models.Coupon as mongoose.Model<ICoupon>) ||
    mongoose.model<ICoupon>("Coupon", couponSchema);

export default CouponModel;