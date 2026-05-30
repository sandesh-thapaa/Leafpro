import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await connectDB();

    const tenant = await TenantBusiness.findOne({
      slug,
      accountStatus: "active",
    })
      .select("-__v")
      .lean();

    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    await TenantBusiness.updateOne(
      { _id: tenant._id },
      { $inc: { pageViewCount: 1 } }
    );

    const data = {
      ...tenant,
      pageViewCount: (tenant.pageViewCount ?? 0) + 1,
    };

    return successResponse(data);
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return errorResponse("Failed to fetch tenant data", 500);
  }
}
