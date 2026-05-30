import { v2 as cloudinary } from "cloudinary";
import { UPLOAD } from "./constants";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  assetUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  format: string;
}

export function validateFile(file: File): {
  valid: boolean;
  error?: string;
} {
  if (!UPLOAD.ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${UPLOAD.ALLOWED_MIME_TYPES.join(", ")}`,
    };
  }

  if (file.size > UPLOAD.MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${UPLOAD.MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

export async function uploadToCloudinary(
  file: File,
  folder?: string
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder ?? UPLOAD.CLOUDINARY_FOLDER,
        resource_type: "image",
        transformation: [
          { width: UPLOAD.FULL_WIDTH, crop: "limit", quality: "auto", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }

        const thumbnailUrl = cloudinary.url(result.public_id, {
          width: UPLOAD.THUMBNAIL_WIDTH,
          crop: "fill",
          quality: "auto",
          fetch_format: "auto",
        });

        resolve({
          assetUrl: result.secure_url,
          thumbnailUrl,
          width: result.width,
          height: result.height,
          format: result.format,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

export async function deleteFromCloudinary(assetUrl: string): Promise<void> {
  const segments = assetUrl.split("/");
  const fileWithExt = segments[segments.length - 1];
  const publicId = fileWithExt.split(".")[0];
  const folder = segments[segments.length - 2];
  const fullPublicId = `${folder}/${publicId}`;

  await cloudinary.uploader.destroy(fullPublicId);
}
