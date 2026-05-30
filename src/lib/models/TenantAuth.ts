import mongoose, { Schema, Document, Model } from "mongoose";

export type AuthRole = "business_owner" | "superadmin";

export interface ITenantAuth extends Document {
  associatedBusinessId: mongoose.Types.ObjectId;
  userLoginPhone: string;
  secureHashValue: string;
  role: AuthRole;
  passwordResetEnforced: boolean;
  lastLoginAt: Date | null;
  loginAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const TenantAuthSchema = new Schema<ITenantAuth>(
  {
    associatedBusinessId: {
      type: Schema.Types.ObjectId,
      ref: "TenantBusiness",
      required: true,
    },
    userLoginPhone: {
      type: String,
      required: true,
      unique: true,
    },
    secureHashValue: { type: String, required: true },
    role: {
      type: String,
      enum: ["business_owner", "superadmin"],
      default: "business_owner",
    },
    passwordResetEnforced: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
    loginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

TenantAuthSchema.index({ associatedBusinessId: 1 });

export const TenantAuth: Model<ITenantAuth> =
  mongoose.models.TenantAuth ??
  mongoose.model<ITenantAuth>("TenantAuth", TenantAuthSchema);
