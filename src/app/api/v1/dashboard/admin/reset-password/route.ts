import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { hashPassword } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

function isSuperadmin(request: NextRequest): boolean {
  return request.headers.get("x-business-role") === "superadmin";
}

export async function POST(request: NextRequest) {
  if (!isSuperadmin(request)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { userId, newPassword } = await request.json();

    if (!userId || !newPassword || newPassword.length < 8) {
      return errorResponse("Valid user ID and password (min 8 chars) are required", 400);
    }

    await connectDB();

    const authRecord = await TenantAuth.findById(userId);
    if (!authRecord) {
      return errorResponse("User not found", 404);
    }

    const hashed = await hashPassword(newPassword);

    await TenantAuth.updateOne(
      { _id: authRecord._id },
      {
        $set: {
          secureHashValue: hashed,
          passwordResetEnforced: true,
          passwordResetRequested: false,
          loginAttempts: 0,
          lockedUntil: null,
        },
      }
    );

    return successResponse({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return errorResponse("Internal server error", 500);
  }
}
