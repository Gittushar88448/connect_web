import mongoose, {
  Document,
  Schema,
  Types,
} from "mongoose";

export enum PaymentProvider {
  RAZORPAY = "razorpay"
}

export enum PaymentStatus {
  CREATED = "created",
  PENDING = "pending",
  AUTHORIZED = "authorized",
  CAPTURED = "captured",
  FAILED = "failed",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CARD = "card",
  UPI = "upi",
  NET_BANKING = "net_banking",
  WALLET = "wallet",
  COD = "cod",
  OTHER = "other",
}

export interface IPayment extends Document {
  order: Types.ObjectId;
  user: Types.ObjectId;

  provider: PaymentProvider;

  providerOrderId?: string;
  providerPaymentId?: string;

  amount: number;
  currency: string;

  status: PaymentStatus;

  method?: PaymentMethod;

  failureReason?: string;

  refundAmount?: number;

  metadata?: Record<string, unknown>;

  paidAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      enum: Object.values(PaymentProvider),
      required: true,
    },

    providerOrderId: {
      type: String,
      index: true,
      sparse: true,
    },

    providerPaymentId: {
      type: String,
      index: true,
      sparse: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.CREATED,
      index: true,
    },

    method: {
      type: String,
      enum: Object.values(PaymentMethod),
    },

    failureReason: {
      type: String,
      trim: true,
    },

    refundAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel =
  (mongoose.models.Payment as mongoose.Model<IPayment>) ||
  mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;