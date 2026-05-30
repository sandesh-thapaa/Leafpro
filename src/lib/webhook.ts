import { WEBHOOK, DEFAULT_CONTENT } from "./constants";
import { hashPassword, generatePasscode } from "./auth";
import { generateUniqueSlug } from "./slug";
import { connectDB } from "./db";
import { TenantBusiness } from "./models/TenantBusiness";
import { TenantAuth } from "./models/TenantAuth";

export interface WebhookPayload {
  from: string;
  text: string;
  msgId?: string;
}

export interface WebhookResult {
  success: boolean;
  slug?: string;
  pageUrl?: string;
  dashboardUrl?: string;
  passcode?: string;
  error?: string;
}

export function extractBusinessName(text: string): string | null {
  const match = text.match(WEBHOOK.EXTRACT_REGEX);
  return match?.[1]?.trim() ?? null;
}

export function composeWelcomeMessage(params: {
  businessName: string;
  slug: string;
  phone: string;
  passcode: string;
}): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://leafpro.com.np";
  return [
    `✅ Your Leafpro page is LIVE!`,
    ``,
    `🔗 ${appUrl}/${params.slug}`,
    `📋 Dashboard: ${appUrl}/dashboard`,
    `🔑 Login: ${params.phone}`,
    `🔐 Passcode: ${params.passcode}`,
    ``,
    `Change your passcode on first login. Upload photos & update text anytime!`,
  ].join("\n");
}

export async function processOnboarding(
  payload: WebhookPayload
): Promise<WebhookResult> {
  try {
    const businessName = extractBusinessName(payload.text);
    if (!businessName) {
      return {
        success: false,
        error:
          "Could not extract business name. Please use format: 'I want to create a website for: Your Business Name'",
      };
    }

    await connectDB();

    const existingTenant = await TenantBusiness.findOne({
      contactPhone: payload.from,
    }).select("slug").lean();

    if (existingTenant) {
      return {
        success: true,
        slug: existingTenant.slug,
        pageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${existingTenant.slug}`,
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        error: "You already have a page. Here are your details:",
      };
    }

    const { slug } = await generateUniqueSlug(businessName);

    const passcode = generatePasscode();
    const hashedPasscode = await hashPassword(passcode);

    const business = await TenantBusiness.create({
      name: businessName,
      slug,
      contactPhone: payload.from,
      heroBlock: {
        mainTitle: businessName,
        subHeadline: DEFAULT_CONTENT.heroSubtitle,
        bannerImageUrl: "",
        ctaText: DEFAULT_CONTENT.ctaText,
      },
      aboutDescription: DEFAULT_CONTENT.aboutDescription,
    });

    await TenantAuth.create({
      associatedBusinessId: business._id,
      userLoginPhone: payload.from,
      secureHashValue: hashedPasscode,
      passwordResetEnforced: true,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://leafpro.com.np";

    return {
      success: true,
      slug,
      pageUrl: `${appUrl}/${slug}`,
      dashboardUrl: `${appUrl}/dashboard`,
      passcode,
    };
  } catch (error) {
    console.error("Onboarding error:", error);
    return {
      success: false,
      error: "An internal error occurred while creating your page. Please try again.",
    };
  }
}
