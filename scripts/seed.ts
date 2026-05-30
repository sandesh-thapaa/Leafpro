import mongoose from "mongoose";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI environment variable is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const TenantBusiness = mongoose.models.TenantBusiness ||
    mongoose.model("TenantBusiness", new mongoose.Schema({}, { strict: false, collection: "tenants" }));

  const TenantAuth = mongoose.models.TenantAuth ||
    mongoose.model("TenantAuth", new mongoose.Schema({}, { strict: false, collection: "auths" }));

  const phone = "8888888888";
  const password = "sandesh";
  const slug = "admin";

  const existing = await TenantBusiness.findOne({ contactPhone: phone }).lean();
  if (existing) {
    console.log(`Admin already exists with slug: ${existing.slug}`);
    await mongoose.disconnect();
    return;
  }

  const bcrypt = await import("bcryptjs");
  const hashed = await bcrypt.hash(password, 12);

  const business = await TenantBusiness.create({
    name: "Admin",
    slug,
    contactPhone: phone,
    accentColorHex: "#3b82f6",
    heroBlock: {
      mainTitle: "Admin",
      subHeadline: "Welcome to my page. Discover our offerings.",
      bannerImageUrl: "",
      ctaText: "Contact Us",
    },
    aboutDescription: "This is a demo admin page for testing.",
    services: [],
    galleryAssets: [],
    routingEndpoints: {
      whatsappActiveNumber: "",
      googleMapsEmbedUrl: "",
      facebookProfileUrl: "",
      instagramHandle: "",
    },
    pageViewCount: 0,
    accountStatus: "active",
    onboardingCompleted: true,
  });

  await TenantAuth.create({
    associatedBusinessId: business._id,
    userLoginPhone: phone,
    secureHashValue: hashed,
    passwordResetEnforced: false,
    loginAttempts: 0,
    lockedUntil: null,
    lastLoginAt: null,
  });

  console.log(`\n\x1b[32m✓ Admin created successfully!\x1b[0m`);
  console.log(`   Phone:    \x1b[33m${phone}\x1b[0m`);
  console.log(`   Password: \x1b[33m${password}\x1b[0m`);
  console.log(`   Slug:     \x1b[33m${slug}\x1b[0m`);
  console.log(`   Dashboard:\x1b[36m http://localhost:3000/dashboard/login\x1b[0m`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
