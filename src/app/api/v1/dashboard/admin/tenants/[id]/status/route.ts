import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { successResponse, errorResponse } from "@/lib/api-response";

function isSuperadmin(request: NextRequest): boolean {
  return request.headers.get("x-business-role") === "superadmin";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSuperadmin(request)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { accountStatus } = await request.json();

    if (!["active", "suspended"].includes(accountStatus)) {
      return errorResponse("Invalid status. Must be 'active' or 'suspended'", 400);
    }

    await connectDB();

    const tenant = await TenantBusiness.findByIdAndUpdate(
      id,
      { $set: { accountStatus } },
      { new: true, runValidators: true }
    ).select("name slug accountStatus").lean();

    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    return successResponse(tenant);
  } catch (error) {
    console.error("Status update error:", error);
    return errorResponse("Internal server error", 500);
  }
}
