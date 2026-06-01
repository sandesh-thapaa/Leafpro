import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { hashPassword } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

export async function POST() {
  try {
    await connectDB();

    const existing = await TenantAuth.findOne({
      userLoginPhone: "0000000000",
    });
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Superadmin already exists",
      });
    }

    const { slug } = await generateUniqueSlug("Leafpro Admin Panel");

    const business = await TenantBusiness.create({
      name: "Leafpro Admin Panel",
      slug,
      contactPhone: "0000000000",
      accountStatus: "suspended",
    });

    const hashed = await hashPassword("superadmin");
    await TenantAuth.create({
      associatedBusinessId: business._id,
      userLoginPhone: "0000000000",
      secureHashValue: hashed,
      role: "superadmin",
      passwordResetEnforced: false,
    });

    return NextResponse.json({
      success: true,
      message: "Superadmin created",
      data: {
        phone: "0000000000",
        password: "superadmin",
      },
    });
  } catch (error) {
    console.error("Seed superadmin error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create superadmin" },
      { status: 500 }
    );
  }
}
