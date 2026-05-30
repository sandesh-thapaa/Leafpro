import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";
import {
  processOnboarding,
  composeWelcomeMessage,
  type WebhookPayload,
} from "@/lib/webhook";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return errorResponse("Invalid webhook secret", 401);
  }

  let payload: WebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Invalid JSON payload", 400);
  }

  if (!payload.from || !payload.text) {
    return errorResponse("Missing required fields: from, text", 400);
  }

  const result = await processOnboarding(payload);

  if (!result.success) {
    return successResponse({
      message: result.error,
    });
  }

  const message = composeWelcomeMessage({
    businessName: payload.text.match(/I want to create a website for:\s*(.+)/i)?.[1]?.trim() ?? "",
    slug: result.slug!,
    phone: payload.from,
    passcode: result.passcode!,
  });

  console.log("=== OUTBOUND WHATSAPP MESSAGE ===");
  console.log(message);
  console.log("=== END ===");

  return successResponse({
    slug: result.slug,
    pageUrl: result.pageUrl,
    dashboardUrl: result.dashboardUrl,
    passcode: result.passcode,
    message: result.error ?? "Page created successfully",
  });
}
