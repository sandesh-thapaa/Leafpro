export const APP_NAME = "Leafpro";
export const APP_TAGLINE = "Your business, online in seconds.";
export const APP_DESCRIPTION =
  "Create a premium landing page for your business via WhatsApp. No code, no hassle.";

export const AUTH = {
  COOKIE_NAME: "leafpro_token",
  SESSION_DURATION_SECONDS: 60 * 60 * 24, // 24 hours
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_MINUTES: 15,
  PASSCODE_LENGTH: 8,
  BCRYPT_ROUNDS: 12,
  PASSWORD_MIN_LENGTH: 8,
};

export const SLUG = {
  MAX_LENGTH: 60,
  COLLISION_SUFFIX_RANGE: 999,
};

export const UPLOAD = {
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_MIME_TYPES: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp", ".avif"],
  CLOUDINARY_FOLDER: "leafpro",
  THUMBNAIL_WIDTH: 150,
  PREVIEW_WIDTH: 640,
  FULL_WIDTH: 1920,
};

export const WEBHOOK = {
  EXTRACT_REGEX: /I want to create a website for:\s*(.+)/i,
  PROVIDER_TIMEOUT_MS: 5000,
  MAX_RETRIES: 3,
};

export const DEFAULT_CONTENT = {
  heroTitle: "Premium Quality & Service",
  heroSubtitle: "Welcome to our space. Discover our offerings and connect directly.",
  aboutDescription:
    "We are committed to delivering the highest standards of professional service to our local community.",
  ctaText: "Contact Us",
};

export const SECTION_TYPES = [
  "hero",
  "about",
  "services",
  "gallery",
  "products",
  "contact",
  "text",
] as const;

export const SECTION_DEFAULTS: Record<string, string> = {
  hero: "centered",
  about: "text-only",
  services: "grid",
  gallery: "grid-3",
  products: "grid",
  contact: "cards",
  text: "default",
};

export const THEME_PRESETS = [
  { name: "Modern Slate", hex: "#0f172a" },
  { name: "Ocean Blue", hex: "#3b82f6" },
  { name: "Warm Amber", hex: "#f59e0b" },
  { name: "Forest Green", hex: "#10b981" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Violet", hex: "#8b5cf6" },
] as const;

export const CTA_OPTIONS = [
  "Contact Us",
  "Book Now",
  "Order Online",
  "Get Quote",
  "Visit Us",
  "Call Now",
  "Custom",
] as const;

export const NEPALI_PHONE_REGEX = /^97798[0-9]{8}$/;

export const LEAFFPRO_WHATSAPP = "9779812345678";
