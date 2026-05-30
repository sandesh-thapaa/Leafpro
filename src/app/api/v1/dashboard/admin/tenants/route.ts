import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { hashPassword } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

function isSuperadmin(request: NextRequest): boolean {
  return request.headers.get("x-business-role") === "superadmin";
}

export async function GET(request: NextRequest) {
  if (!isSuperadmin(request)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const businesses = await TenantBusiness.find({})
    .select("name slug contactPhone accountStatus createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const authRecords = await TenantAuth.find({})
    .select("userLoginPhone associatedBusinessId role")
    .lean();

  const authMap = new Map(
    authRecords.map((a) => [a.associatedBusinessId.toString(), a])
  );

  const tenants = businesses.map((b) => {
    const auth = authMap.get(b._id.toString());
    return {
      _id: b._id,
      name: b.name,
      slug: b.slug,
      phone: auth?.userLoginPhone ?? "",
      role: auth?.role ?? "business_owner",
      accountStatus: b.accountStatus,
      createdAt: b.createdAt,
    };
  });

  return NextResponse.json({ success: true, data: tenants });
}

export async function POST(request: NextRequest) {
  if (!isSuperadmin(request)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { name, phone, password } = await request.json();

    if (!name || !phone || !password) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const phoneExists = await TenantAuth.findOne({ userLoginPhone: phone });
    if (phoneExists) {
      return NextResponse.json(
        { success: false, error: "Phone number already registered" },
        { status: 409 }
      );
    }

    const { slug } = await generateUniqueSlug(name);

    const business = await TenantBusiness.create({
      name,
      slug,
      contactPhone: phone,
    });

    const hashed = await hashPassword(password);
    await TenantAuth.create({
      associatedBusinessId: business._id,
      userLoginPhone: phone,
      secureHashValue: hashed,
      role: "business_owner",
      passwordResetEnforced: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        name,
        slug,
        phone,
        pageUrl: `/${slug}`,
        dashboardUrl: `/dashboard/login`,
      },
    });
  } catch (error) {
    console.error("Create tenant error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create tenant" },
      { status: 500 }
    );
  }
}
