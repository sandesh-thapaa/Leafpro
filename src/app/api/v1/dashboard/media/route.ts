import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { getAuthenticatedUser } from "@/lib/auth";
import { uploadToCloudinary, validateFile } from "@/lib/upload";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      return errorResponse(validation.error!, 400);
    }

    const uploadResult = await uploadToCloudinary(file, `leafpro/${user.slug}`);

    await connectDB();

    const tenant = await TenantBusiness.findByIdAndUpdate(
      user.businessId,
      {
        $push: {
          galleryAssets: {
            assetUrl: uploadResult.assetUrl,
            thumbnailUrl: uploadResult.thumbnailUrl,
            assetCaption: "",
            assetOrder: Date.now(),
            uploadedAt: new Date(),
          },
        },
      },
      { new: true }
    ).select("galleryAssets").lean();

    const newAsset = tenant?.galleryAssets?.slice(-1)?.[0];

    return successResponse(
      {
        ...uploadResult,
        assetId: ((newAsset as unknown as { _id: string })?._id?.toString()) ?? "",
      },
      201
    );
  } catch (error) {
    console.error("Media upload error:", error);
    return errorResponse("Upload failed", 500);
  }
}
