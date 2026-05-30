import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantAuth } from "@/lib/models/TenantAuth";
import { TenantBusiness } from "@/lib/models/TenantBusiness";
import { comparePassword, signJwt } from "@/lib/auth";
import { errorResponse } from "@/lib/api-response";
import { AUTH } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { phone, password } = await request.json();

    if (!phone || !password) {
      return errorResponse("Phone and password are required", 400);
    }

    await connectDB();

    const authRecord = await TenantAuth.findOne({
      userLoginPhone: phone,
    });

    if (!authRecord) {
      return errorResponse("Invalid credentials", 401);
    }

    if (authRecord.lockedUntil && authRecord.lockedUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (authRecord.lockedUntil.getTime() - Date.now()) / 60000
      );
      return errorResponse(
        `Account locked. Try again in ${remainingMinutes} minutes.`,
        429
      );
    }

    const isValid = await comparePassword(password, authRecord.secureHashValue);

    if (!isValid) {
      const attempts = (authRecord.loginAttempts ?? 0) + 1;
      const update: Record<string, unknown> = { loginAttempts: attempts };

      if (attempts >= AUTH.MAX_LOGIN_ATTEMPTS) {
        update.lockedUntil = new Date(
          Date.now() + AUTH.LOCKOUT_DURATION_MINUTES * 60 * 1000
        );
        update.loginAttempts = 0;
      }

      await TenantAuth.updateOne(
        { _id: authRecord._id },
        { $set: update }
      );

      return errorResponse("Invalid credentials", 401);
    }

    await TenantAuth.updateOne(
      { _id: authRecord._id },
      {
        $set: {
          loginAttempts: 0,
          lockedUntil: null,
          lastLoginAt: new Date(),
        },
      }
    );

    const business = await TenantBusiness.findById(
      authRecord.associatedBusinessId
    ).select("name slug onboardingCompleted").lean();

    if (!business) {
      return errorResponse("Business not found", 404);
    }

    if (business.onboardingCompleted === false) {
      await TenantBusiness.updateOne(
        { _id: business._id },
        { $set: { onboardingCompleted: true } }
      );
    }

    const token = await signJwt({
      businessId: authRecord.associatedBusinessId.toString(),
      phone: authRecord.userLoginPhone,
      slug: business.slug,
      role: authRecord.role || "business_owner",
    });

    const body = JSON.stringify({
      success: true,
      data: {
        token,
        resetRequired: authRecord.passwordResetEnforced,
        businessName: business.name,
        slug: business.slug,
        role: authRecord.role || "business_owner",
      },
      error: null,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `leaf-${crypto.randomUUID().slice(0, 8)}`,
      },
    });

    const response = new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

    response.cookies.set(AUTH.COOKIE_NAME, token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AUTH.SESSION_DURATION_SECONDS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("Internal server error", 500);
  }
}
