import { SLUG } from "./constants";
import { TenantBusiness } from "./models/TenantBusiness";

function sanitize(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, SLUG.MAX_LENGTH);
}

function randomSuffix(): string {
  return String(Math.floor(Math.random() * SLUG.COLLISION_SUFFIX_RANGE) + 1).padStart(3, "0");
}

export async function generateUniqueSlug(businessName: string): Promise<{
  slug: string;
  hadCollision: boolean;
}> {
  const base = sanitize(businessName);
  if (!base) {
    throw new Error("Could not generate a valid slug from the business name");
  }

  const existing = await TenantBusiness.findOne({ slug: base }).select("_id").lean();
  if (!existing) {
    return { slug: base, hadCollision: false };
  }

  let slug = "";
  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    slug = `${base}-${randomSuffix()}`;
    const clash = await TenantBusiness.findOne({ slug }).select("_id").lean();
    if (!clash) {
      return { slug, hadCollision: true };
    }
    attempts++;
  }

  throw new Error("Unable to generate a unique slug after maximum attempts");
}
