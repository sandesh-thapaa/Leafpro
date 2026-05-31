import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(_request: NextRequest) {
  try {
    await connectDB();

    const tenants = await TenantBusiness.find({ accountStatus: "active" })
      .select("name slug heroBlock.bannerImageUrl aboutDescription brandLogoUrl accentColorHex")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const portfolio = tenants.map((t: any) => ({
      name: t.name,
      slug: t.slug,
      thumbnailUrl: t.heroBlock?.bannerImageUrl || t.brandLogoUrl || "",
      description: (t.aboutDescription || "").slice(0, 120),
      accentColor: t.accentColorHex || "#3b82f6",
    }));

    return successResponse(portfolio);
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}
