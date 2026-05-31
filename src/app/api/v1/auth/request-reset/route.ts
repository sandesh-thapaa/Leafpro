import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return errorResponse("Phone number is required", 400);
    }

    await connectDB();

    const authRecord = await TenantAuth.findOne({ userLoginPhone: phone });

    if (authRecord) {
      await TenantAuth.updateOne(
        { _id: authRecord._id },
        { $set: { passwordResetRequested: true } }
      );
    }

    // Always return success — don't reveal if phone is registered
    return Response.json(
      {
        success: true,
        data: { message: "If the phone number is registered, a reset request has been submitted." },
        error: null,
        meta: { timestamp: new Date().toISOString(), requestId: `leaf-${crypto.randomUUID().slice(0, 8)}` },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset request error:", error);
    return errorResponse("Internal server error", 500);
  }
}
