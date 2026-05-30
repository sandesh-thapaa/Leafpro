import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { TenantBusiness, type IServiceOffering, type IGalleryAsset, type IProductItem, type ICustomTextSection, type IPageSectionConfig } from "@/lib/models/TenantBusiness";
import { TenantPageClient } from "./TenantPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTenant(slug: string) {
  await connectDB();
  const tenant = await TenantBusiness.findOne({
    slug,
    accountStatus: "active",
  })
    .select("-__v")
    .lean();

  if (!tenant) return null;

  await TenantBusiness.updateOne(
    { _id: tenant._id },
    { $inc: { pageViewCount: 1 } }
  );

  const data = {
    _id: tenant._id.toString(),
    name: tenant.name,
    slug: tenant.slug,
    contactPhone: tenant.contactPhone,
    brandLogoUrl: tenant.brandLogoUrl ?? "",
    accentColorHex: tenant.accentColorHex ?? "#3b82f6",
    heroBlock: {
      mainTitle: tenant.heroBlock?.mainTitle ?? tenant.name,
      subHeadline: tenant.heroBlock?.subHeadline ?? "",
      bannerImageUrl: tenant.heroBlock?.bannerImageUrl ?? "",
      ctaText: tenant.heroBlock?.ctaText ?? "Contact Us",
    },
    aboutDescription: tenant.aboutDescription ?? "",
    aboutImageUrl: (tenant as any).aboutImageUrl ?? "",
    services: ((tenant.services ?? []) as IServiceOffering[]).map((s) => ({
      title: s.title ?? "",
      description: s.description ?? "",
      icon: s.icon ?? "✨",
      price: s.price ?? "",
      isPopular: s.isPopular ?? false,
      _id: s._id?.toString() ?? "",
    })),
    galleryAssets: ((tenant.galleryAssets ?? []) as IGalleryAsset[]).map(
      (g) => ({
        _id: g._id?.toString() ?? "",
        assetUrl: g.assetUrl ?? "",
        thumbnailUrl: g.thumbnailUrl ?? "",
        assetCaption: g.assetCaption ?? "",
        assetOrder: g.assetOrder ?? 0,
        uploadedAt: (g.uploadedAt as Date)?.toISOString() ?? "",
      })
    ),
    products: ((tenant as any).products ?? [] as IProductItem[]).map((p: IProductItem) => ({
      _id: (p._id as any)?.toString() ?? "",
      title: p.title ?? "",
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      price: p.price ?? "",
      isPopular: p.isPopular ?? false,
      order: p.order ?? 0,
    })),
    customTexts: ((tenant as any).customTexts ?? [] as ICustomTextSection[]).map((c: ICustomTextSection) => ({
      _id: (c._id as any)?.toString() ?? "",
      title: c.title ?? "",
      content: c.content ?? "",
      order: c.order ?? 0,
    })),
    sections: ((tenant as any).sections ?? [] as IPageSectionConfig[]).map((s: IPageSectionConfig) => ({
      _id: (s._id as any)?.toString() ?? "",
      sectionType: s.sectionType ?? "hero",
      enabled: s.enabled ?? true,
      order: s.order ?? 0,
      layout: s.layout ?? "centered",
    })),
    routingEndpoints: {
      whatsappActiveNumber: tenant.routingEndpoints?.whatsappActiveNumber ?? "",
      googleMapsEmbedUrl: tenant.routingEndpoints?.googleMapsEmbedUrl ?? "",
      facebookProfileUrl: tenant.routingEndpoints?.facebookProfileUrl ?? "",
      instagramHandle: tenant.routingEndpoints?.instagramHandle ?? "",
    },
    pageViewCount: (tenant.pageViewCount ?? 0) + 1,
    accountStatus: tenant.accountStatus ?? "active",
    onboardingCompleted: tenant.onboardingCompleted ?? false,
    createdAt: (tenant.createdAt as Date)?.toISOString() ?? "",
    updatedAt: (tenant.updatedAt as Date)?.toISOString() ?? "",
  };

  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getTenant(slug);

  if (!tenant) {
    return {
      title: "Page Not Found | Leafpro",
      description: "This page does not exist.",
    };
  }

  const title = `${tenant.name} | ${tenant.heroBlock.subHeadline || "Leafpro"}`;
  const description = tenant.aboutDescription?.slice(0, 160) || "";
  const imageUrl = tenant.heroBlock.bannerImageUrl || tenant.brandLogoUrl || "";

  return {
    title,
    description,
    openGraph: {
      title: tenant.name,
      description,
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://leafpro.com.np"}/${tenant.slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: "website",
      siteName: "Leafpro",
    },
    twitter: {
      card: "summary_large_image",
      title: tenant.name,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/${tenant.slug}`,
    },
  };
}

export default async function TenantPage({ params }: PageProps) {
  const { slug } = await params;
  const tenant = await getTenant(slug);

  if (!tenant) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: tenant.name,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://leafpro.com.np"}/${tenant.slug}`,
    telephone: tenant.contactPhone,
    image: tenant.heroBlock.bannerImageUrl || undefined,
    description: tenant.aboutDescription?.slice(0, 200) || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TenantPageClient tenant={tenant} />
    </>
  );
}
