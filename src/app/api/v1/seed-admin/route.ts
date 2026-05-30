import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  try {
    await connectDB();

    const phone = "8888888888";
    const password = "sandesh";
    const slug = "admin";

    const existing = await TenantBusiness.findOne({ contactPhone: phone }).select("slug").lean();
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists",
        data: {
          phone,
          slug: existing.slug,
          dashboardUrl: "/dashboard/login",
        },
      });
    }

    const hashed = await hashPassword(password);

    const business = await TenantBusiness.create({
      name: "Admin",
      slug,
      contactPhone: phone,
      accentColorHex: "#3b82f6",
      heroBlock: {
        mainTitle: "Admin",
        subHeadline: "Welcome to my page. Discover our offerings.",
        bannerImageUrl: "",
        ctaText: "Contact Us",
      },
      aboutDescription: "This is a demo admin page for testing.",
      services: [],
      galleryAssets: [],
      routingEndpoints: {
        whatsappActiveNumber: "",
        googleMapsEmbedUrl: "",
        facebookProfileUrl: "",
        instagramHandle: "",
      },
      pageViewCount: 0,
      accountStatus: "active",
      onboardingCompleted: true,
    });

    await TenantAuth.create({
      associatedBusinessId: business._id,
      userLoginPhone: phone,
      secureHashValue: hashed,
      passwordResetEnforced: false,
      loginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: null,
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      data: {
        phone,
        password,
        slug,
        dashboardUrl: "/dashboard/login",
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed admin" },
      { status: 500 }
    );
  }
}
