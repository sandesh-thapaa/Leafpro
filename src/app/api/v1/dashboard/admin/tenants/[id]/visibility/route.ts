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
    const { hidden } = await request.json();

    if (typeof hidden !== "boolean") {
      return errorResponse("'hidden' must be a boolean", 400);
    }

    await connectDB();

    const tenant = await TenantBusiness.findById(id).select("sections");
    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    const sections = (tenant as any).sections?.map((s: any) => ({
      ...s,
      enabled: !hidden,
    })) || [];

    await TenantBusiness.updateOne(
      { _id: id },
      { $set: { sections } }
    );

    return successResponse({
      message: hidden ? "Content hidden" : "Content unhidden",
    });
  } catch (error) {
    console.error("Visibility update error:", error);
    return errorResponse("Internal server error", 500);
  }
}
