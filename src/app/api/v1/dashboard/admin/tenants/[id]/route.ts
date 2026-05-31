import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { deleteFromCloudinary } from "@/lib/upload";
import { successResponse, errorResponse } from "@/lib/api-response";

function isSuperadmin(request: NextRequest): boolean {
  return request.headers.get("x-business-role") === "superadmin";
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSuperadmin(_request)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;

    await connectDB();

    const tenant = await TenantBusiness.findById(id).select("galleryAssets slug name");
    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    const galleryAssets = ((tenant as any).galleryAssets || []) as any[];
    for (const asset of galleryAssets) {
      try {
        await deleteFromCloudinary(asset.assetUrl);
      } catch (err) {
        console.warn(`Failed to delete Cloudinary asset: ${asset.assetUrl}`, err);
      }
    }

    await TenantAuth.deleteMany({ associatedBusinessId: id });
    await TenantBusiness.findByIdAndDelete(id);

    return successResponse({ message: "Tenant and all associated data permanently deleted" });
  } catch (error) {
    console.error("Tenant deletion error:", error);
    return errorResponse("Internal server error", 500);
  }
}
