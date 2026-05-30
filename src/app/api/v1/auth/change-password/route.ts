import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantAuth } from "@/lib/models/TenantAuth";
import {
  comparePassword,
  hashPassword,
  getAuthenticatedUser,
  validatePassword,
} from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return errorResponse("Current password and new password are required", 400);
    }

    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      return errorResponse(validation.message, 400);
    }

    await connectDB();

    const authRecord = await TenantAuth.findOne({
      associatedBusinessId: user.businessId,
    });

    if (!authRecord) {
      return errorResponse("Auth record not found", 404);
    }

    const isValid = await comparePassword(
      currentPassword,
      authRecord.secureHashValue
    );

    if (!isValid) {
      return errorResponse("Current password is incorrect", 401);
    }

    const newHash = await hashPassword(newPassword);

    await TenantAuth.updateOne(
      { _id: authRecord._id },
      {
        $set: {
          secureHashValue: newHash,
          passwordResetEnforced: false,
        },
      }
    );

    return successResponse({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return errorResponse("Internal server error", 500);
  }
}
