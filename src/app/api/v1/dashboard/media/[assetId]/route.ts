import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { getAuthenticatedUser } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/upload";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const { assetId } = await params;

    await connectDB();

    const tenant = await TenantBusiness.findOne({
      _id: user.businessId,
    }).select("galleryAssets payments");

    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    const asset = tenant.galleryAssets.find(
      (a) => a._id?.toString() === assetId
    );

    if (asset) {
      await deleteFromCloudinary(asset.assetUrl);
      await TenantBusiness.updateOne(
        { _id: user.businessId },
        { $pull: { galleryAssets: { _id: assetId } } }
      );
      return successResponse({ message: "Asset deleted successfully" });
    }

    const payment = tenant.payments.find(
      (p) => p._id?.toString() === assetId
    );

    if (!payment) {
      return errorResponse("Asset not found", 404);
    }

    await deleteFromCloudinary(payment.imageUrl);
    await TenantBusiness.updateOne(
      { _id: user.businessId },
      { $pull: { payments: { _id: assetId } } }
    );

    return successResponse({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Media delete error:", error);
    return errorResponse("Delete failed", 500);
  }
}
