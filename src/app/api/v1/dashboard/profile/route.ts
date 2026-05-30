import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { getAuthenticatedUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import type { ProfileUpdateData } from "@/types/api";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    await connectDB();

    const tenant = await TenantBusiness.findById(user.businessId)
      .select("-__v")
      .lean();

    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    return successResponse(tenant);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const body: ProfileUpdateData = await request.json();

    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.aboutDescription !== undefined)
      updateData.aboutDescription = body.aboutDescription;
    if (body.aboutImageUrl !== undefined)
      updateData.aboutImageUrl = body.aboutImageUrl;
    if (body.brandLogoUrl !== undefined)
      updateData.brandLogoUrl = body.brandLogoUrl;
    if (body.accentColorHex !== undefined)
      updateData.accentColorHex = body.accentColorHex;

    if (body.heroBlock) {
      const hero = body.heroBlock;
      if (hero.mainTitle !== undefined)
        updateData["heroBlock.mainTitle"] = hero.mainTitle;
      if (hero.subHeadline !== undefined)
        updateData["heroBlock.subHeadline"] = hero.subHeadline;
      if (hero.bannerImageUrl !== undefined)
        updateData["heroBlock.bannerImageUrl"] = hero.bannerImageUrl;
      if (hero.ctaText !== undefined)
        updateData["heroBlock.ctaText"] = hero.ctaText;
    }

    if (body.services !== undefined) {
      updateData.services = body.services;
    }

    if (body.products !== undefined) {
      updateData.products = body.products;
    }

    if (body.customTexts !== undefined) {
      updateData.customTexts = body.customTexts;
    }

    if (body.sections !== undefined) {
      updateData.sections = body.sections;
    }

    if (body.routingEndpoints) {
      const endpoints = body.routingEndpoints;
      if (endpoints.whatsappActiveNumber !== undefined)
        updateData["routingEndpoints.whatsappActiveNumber"] =
          endpoints.whatsappActiveNumber;
      if (endpoints.googleMapsEmbedUrl !== undefined)
        updateData["routingEndpoints.googleMapsEmbedUrl"] =
          endpoints.googleMapsEmbedUrl;
      if (endpoints.facebookProfileUrl !== undefined)
        updateData["routingEndpoints.facebookProfileUrl"] =
          endpoints.facebookProfileUrl;
      if (endpoints.instagramHandle !== undefined)
        updateData["routingEndpoints.instagramHandle"] =
          endpoints.instagramHandle;
    }

    await connectDB();

    const tenant = await TenantBusiness.findOneAndUpdate(
      { _id: user.businessId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-__v").lean();

    if (!tenant) {
      return errorResponse("Tenant not found", 404);
    }

    return successResponse(tenant);
  } catch (error) {
    console.error("Profile update error:", error);
    return errorResponse("Internal server error", 500);
  }
}
