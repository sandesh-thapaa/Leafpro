import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { successResponse, errorResponse } from "@/lib/api-response";

function isSuperadmin(request: NextRequest): boolean {
  return request.headers.get("x-business-role") === "superadmin";
}

export async function GET(request: NextRequest) {
  if (!isSuperadmin(request)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const resetRequests = await TenantAuth.find({ passwordResetRequested: true })
    .select("userLoginPhone associatedBusinessId createdAt updatedAt")
    .lean();

  const businessIds = resetRequests.map((r) => r.associatedBusinessId);
  const businesses = await TenantBusiness.find({ _id: { $in: businessIds } })
    .select("name slug")
    .lean();

  const businessMap = new Map(businesses.map((b: any) => [b._id.toString(), b]));

  const result = resetRequests.map((r: any) => ({
    _id: r._id,
    phone: r.userLoginPhone,
    businessName: businessMap.get(r.associatedBusinessId.toString())?.name ?? "Unknown",
    slug: businessMap.get(r.associatedBusinessId.toString())?.slug ?? "",
    requestedAt: r.createdAt,
  }));

  return successResponse(result);
}
