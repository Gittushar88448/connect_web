import mongoose, {Schema, Document} from "mongoose";

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
  DRAFT = "draft",
}

export interface IProduct extends Document{
    name: string;
    slug: string;
    shortDescription?: string;
    description: string;
    category: mongoose.Types.ObjectId;
    price: number;
    stock: number;
    images: string[];
    specifications: Map<string, string>;
    status: ProductStatus;
    coinReward: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.DRAFT
    },

    coinReward: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;