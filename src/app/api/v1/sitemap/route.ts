import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TenantBusiness } from "@/lib/models/TenantBusiness";

export async function GET() {
  try {
    await connectDB();

    const tenants = await TenantBusiness.find({
      accountStatus: "active",
    })
      .select("slug updatedAt")
      .lean();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://leafpro.com.np";

    const urls = tenants
      .map(
        (t) => `
  <url>
    <loc>${appUrl}/${t.slug}</loc>
    <lastmod>${(t.updatedAt as Date).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${appUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new NextResponse("Sitemap generation failed", { status: 500 });
  }
}
