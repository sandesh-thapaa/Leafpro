export interface GalleryAsset {
  _id?: string;
  assetUrl: string;
  thumbnailUrl: string;
  assetCaption: string;
  assetOrder: number;
  uploadedAt: string;
}

export interface ServiceOffering {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  isPopular: boolean;
}

export interface ProductItem {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  isPopular: boolean;
  order: number;
}

export interface CustomTextSection {
  _id?: string;
  title: string;
  content: string;
  order: number;
}

export type SectionType = "hero" | "about" | "services" | "gallery" | "products" | "contact" | "text";

export interface PageSectionConfig {
  _id?: string;
  sectionType: SectionType;
  enabled: boolean;
  order: number;
  layout: string;
}

export interface HeroBlock {
  mainTitle: string;
  subHeadline: string;
  bannerImageUrl: string;
  ctaText: string;
}

export interface RoutingEndpoints {
  whatsappActiveNumber: string;
  googleMapsEmbedUrl: string;
  facebookProfileUrl: string;
  instagramHandle: string;
  tiktokUrl: string;
  linkedInUrl: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  twitterHandle: string;
  telegramHandle: string;
}

export interface TenantData {
  _id: string;
  name: string;
  slug: string;
  contactPhone: string;
  brandLogoUrl: string;
  accentColorHex: string;
  heroBlock: HeroBlock;
  aboutDescription: string;
  aboutImageUrl: string;
  services: ServiceOffering[];
  products: ProductItem[];
  customTexts: CustomTextSection[];
  galleryAssets: GalleryAsset[];
  routingEndpoints: RoutingEndpoints;
  sections: PageSectionConfig[];
  pageViewCount: number;
  accountStatus: "active" | "suspended";
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  about: "About",
  services: "Services",
  gallery: "Gallery",
  products: "Products",
  contact: "Contact",
  text: "Text Block",
};

export const SECTION_LAYOUTS: Record<SectionType, { value: string; label: string }[]> = {
  hero: [
    { value: "centered", label: "Centered (no image)" },
    { value: "split-right", label: "Text left + Image right" },
  ],
  about: [
    { value: "text-only", label: "Text only" },
    { value: "image-right", label: "Text left + Image right" },
    { value: "image-left", label: "Image left + Text right" },
  ],
  services: [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ],
  gallery: [
    { value: "grid-3", label: "3 columns" },
    { value: "grid-4", label: "4 columns" },
    { value: "masonry", label: "Masonry" },
  ],
  products: [
    { value: "grid", label: "Grid" },
    { value: "card-row", label: "Card row" },
  ],
  contact: [
    { value: "cards", label: "Cards" },
    { value: "minimal", label: "Minimal" },
  ],
  text: [
    { value: "default", label: "Default" },
  ],
};
