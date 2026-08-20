import mongoose, {
  Document,
  Schema,
  Types,
} from "mongoose";

export interface IRefreshToken extends Document {
  userId: Types.ObjectId;

  tokenHash: string;

  tokenFamily: string;

  expiresAt: Date;

  revokedAt?: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

const refreshTokenSchema =
  new Schema<IRefreshToken>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id Required"],
        index: true,
      },

      tokenHash: {
        type: String,
        required: [true, "Refresh Token Hash Required"],
        unique: true,
        index: true,
      },

      tokenFamily: {
        type: String,
        required: [true, "Token Family Required"],
        index: true,
      },

      expiresAt: {
        type: Date,
        required: true,
        index: true,
      },

      revokedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );


  refreshTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const RefreshTokenModel = 
    (mongoose.models.RefreshToken as mongoose.Model<IRefreshToken>) || 
    mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);

export default RefreshTokenModel;