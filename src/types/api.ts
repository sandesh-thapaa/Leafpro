export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  code?: string;
  meta: {
    timestamp: string;
    requestId: string;
  };
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  resetRequired: boolean;
  businessName: string;
  slug: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface WebhookBody {
  from: string;
  text: string;
  msgId?: string;
}

export interface ProfileUpdateData {
  name?: string;
  heroBlock?: Partial<{
    mainTitle: string;
    subHeadline: string;
    bannerImageUrl: string;
    ctaText: string;
  }>;
  aboutDescription?: string;
  aboutImageUrl?: string;
  brandLogoUrl?: string;
  accentColorHex?: string;
  services?: Array<{
    title: string;
    description: string;
    icon: string;
    price: string;
    isPopular: boolean;
  }>;
  products?: Array<{
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    isPopular: boolean;
    order: number;
  }>;
  customTexts?: Array<{
    title: string;
    content: string;
    order: number;
  }>;
  sections?: Array<{
    _id?: string;
    sectionType: string;
    enabled: boolean;
    order: number;
    layout: string;
  }>;
  routingEndpoints?: Partial<{
    whatsappActiveNumber: string;
    googleMapsEmbedUrl: string;
    facebookProfileUrl: string;
    instagramHandle: string;
  }>;
}
