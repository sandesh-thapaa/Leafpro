import { NextRequest } from "next/server";
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

    return successResponse({
      assetUrl: uploadResult.assetUrl,
      thumbnailUrl: uploadResult.thumbnailUrl,
    }, 201);
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse("Upload failed", 500);
  }
}
