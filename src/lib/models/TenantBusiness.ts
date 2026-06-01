import mongoose, { Schema, Document, Model } from "mongoose";

export type SectionType = "hero" | "about" | "services" | "gallery" | "products" | "contact" | "text" | "payments";

export interface IPageSectionConfig {
  _id?: string;
  sectionType: SectionType;
  enabled: boolean;
  order: number;
  layout: string;
}

export interface IGalleryAsset {
  _id?: string;
  assetUrl: string;
  thumbnailUrl: string;
  assetCaption: string;
  assetOrder: number;
  uploadedAt: Date;
}

export interface IServiceOffering {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  isPopular: boolean;
}

export interface IProductItem {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  isPopular: boolean;
  order: number;
}

export interface IPaymentQr {
  _id?: string;
  imageUrl: string;
  label: string;
  order: number;
}

export interface ICustomTextSection {
  _id?: string;
  title: string;
  content: string;
  order: number;
}

export interface IHeroBlock {
  mainTitle: string;
  subHeadline: string;
  bannerImageUrl: string;
  ctaText: string;
}

export interface IRoutingEndpoints {
  whatsappActiveNumber: string;
  googleMapsEmbedUrl: string;
  facebookProfileUrl: string;
  instagramHandle: string;
  tiktokUrl: string;
  linkedInUrl: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  googleReviewUrl: string;
  twitterHandle: string;
  telegramHandle: string;
}

export interface ITenantBusiness extends Document {
  name: string;
  slug: string;
  contactPhone: string;
  brandLogoUrl: string;
  accentColorHex: string;
  heroBlock: IHeroBlock;
  aboutDescription: string;
  aboutImageUrl: string;
  services: IServiceOffering[];
  products: IProductItem[];
  payments: IPaymentQr[];
  customTexts: ICustomTextSection[];
  galleryAssets: IGalleryAsset[];
  routingEndpoints: IRoutingEndpoints;
  sections: IPageSectionConfig[];
  pageViewCount: number;
  accountStatus: "active" | "suspended";
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryAssetSchema = new Schema<IGalleryAsset>(
  {
    assetUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    assetCaption: { type: String, default: "" },
    assetOrder: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ServiceOfferingSchema = new Schema<IServiceOffering>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "✨" },
  price: { type: String, default: "" },
  isPopular: { type: Boolean, default: false },
});

const ProductItemSchema = new Schema<IProductItem>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  price: { type: String, default: "" },
  isPopular: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const PaymentQrSchema = new Schema<IPaymentQr>({
  imageUrl: { type: String, default: "" },
  label: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const CustomTextSectionSchema = new Schema<ICustomTextSection>({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const PageSectionConfigSchema = new Schema<IPageSectionConfig>(
  {
    sectionType: {
      type: String,
      enum: ["hero", "about", "services", "gallery", "products", "contact", "text", "payments"],
      required: true,
    },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    layout: { type: String, default: "default" },
  },
  { _id: true }
);

const RoutingEndpointsSchema = new Schema<IRoutingEndpoints>(
  {
    whatsappActiveNumber: { type: String, default: "" },
    googleMapsEmbedUrl: { type: String, default: "" },
    facebookProfileUrl: { type: String, default: "" },
    instagramHandle: { type: String, default: "" },
    tiktokUrl: { type: String, default: "" },
    linkedInUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
    youtubeEmbedUrl: { type: String, default: "" },
    googleReviewUrl: { type: String, default: "" },
    twitterHandle: { type: String, default: "" },
    telegramHandle: { type: String, default: "" },
  },
  { _id: false }
);

const TenantBusinessSchema = new Schema<ITenantBusiness>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contactPhone: { type: String, required: true },

    brandLogoUrl: { type: String, default: "" },
    accentColorHex: { type: String, default: "#3b82f6" },

    heroBlock: {
      mainTitle: { type: String, default: "Premium Quality & Service" },
      subHeadline: {
        type: String,
        default: "Welcome to our space. Discover our offerings and connect directly.",
      },
      bannerImageUrl: { type: String, default: "" },
      ctaText: { type: String, default: "Contact Us" },
    },

    aboutDescription: {
      type: String,
      default:
        "We are committed to delivering the highest standards of professional service to our local community.",
    },
    aboutImageUrl: { type: String, default: "" },

    services: { type: [ServiceOfferingSchema], default: [] },
    products: { type: [ProductItemSchema], default: [] },
    payments: { type: [PaymentQrSchema], default: [] },
    customTexts: { type: [CustomTextSectionSchema], default: [] },
    galleryAssets: { type: [GalleryAssetSchema], default: [] },
    routingEndpoints: { type: RoutingEndpointsSchema, default: () => ({}) },
    sections: { type: [PageSectionConfigSchema], default: [] },

    pageViewCount: { type: Number, default: 0 },
    accountStatus: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    onboardingCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TenantBusinessSchema.index({ contactPhone: 1 });
TenantBusinessSchema.index({ accountStatus: 1, createdAt: -1 });

export const TenantBusiness: Model<ITenantBusiness> =
  mongoose.models.TenantBusiness ??
  mongoose.model<ITenantBusiness>("TenantBusiness", TenantBusinessSchema);
