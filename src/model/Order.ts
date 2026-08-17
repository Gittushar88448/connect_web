import mongoose, { Document, Schema, Types } from "mongoose";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName?: string;

  phone: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  user: Types.ObjectId;

  items: IOrderItem[];

  subtotal: number;

  coupon?: Types.ObjectId;
  couponDiscount: number;

  coinsUsed: number;
  coinDiscount: number;

  shippingFee: number;
  tax: number;

  total: number;

  shippingAddress: IShippingAddress;

  status: OrderStatus;

  paymentStatus: string;

  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        total: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },

    couponDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },

    coinsUsed: {
      type: Number,
      default: 0,
      min: 0,
    },

    coinDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: String,

      phone: {
        type: String,
        required: true,
      },

      addressLine1: {
        type: String,
        required: true,
      },

      addressLine2: String,

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
        default: "India",
      },
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
      index: true,
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  (mongoose.models.Order as mongoose.Model<IOrder>) ||
  mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;