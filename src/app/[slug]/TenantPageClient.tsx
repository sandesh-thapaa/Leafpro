"use client";

import { useEffect, useMemo } from "react";
import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { GallerySection } from "@/components/public/GallerySection";
import { ProductsSection } from "@/components/public/ProductsSection";
import { PaymentsSection } from "@/components/public/PaymentsSection";
import { ContactSection } from "@/components/public/ContactSection";
import { TextSection } from "@/components/public/TextSection";
import { Footer } from "@/components/public/Footer";
import type { TenantData, PageSectionConfig, SectionType } from "@/types/tenant";

interface TenantPageClientProps {
  tenant: TenantData;
}

export function TenantPageClient({ tenant }: TenantPageClientProps) {
  const accentColor = tenant.accentColorHex || "#ed6f5c";

  const waMsg = encodeURIComponent(
    "Hi, I visited your page on Leafpro and would like to know more."
  );
  const waLink = tenant.routingEndpoints.whatsappActiveNumber
    ? `https://wa.me/${tenant.routingEndpoints.whatsappActiveNumber.replace(/[^0-9]/g, "")}?text=${waMsg}`
    : "#";

  const sections = useMemo(() => {
    const raw = tenant.sections;
    if (raw && raw.length > 0) {
      return raw
        .filter((s) => s.enabled && s.sectionType)
        .sort((a, b) => a.order - b.order);
    }

    const defaults: PageSectionConfig[] = [];
    let order = 0;
    defaults.push({
      sectionType: "hero", enabled: true, order: order++,
      layout: tenant.heroBlock.bannerImageUrl ? "split-right" : "centered",
    });
    if (tenant.aboutDescription) {
      defaults.push({
        sectionType: "about", enabled: true, order: order++,
        layout: tenant.aboutImageUrl ? "image-right" : "text-only",
      });
    }
    if (tenant.services && tenant.services.length > 0) {
      defaults.push({
        sectionType: "services", enabled: true, order: order++, layout: "grid",
      });
    }
    if (tenant.products && tenant.products.length > 0) {
      defaults.push({
        sectionType: "products", enabled: true, order: order++, layout: "grid",
      });
    }
    if (tenant.payments && tenant.payments.length > 0) {
      defaults.push({
        sectionType: "payments", enabled: true, order: order++, layout: "grid",
      });
    }
    if (tenant.galleryAssets && tenant.galleryAssets.length > 0) {
      defaults.push({
        sectionType: "gallery", enabled: true, order: order++, layout: "grid-3",
      });
    }
    if (tenant.customTexts && tenant.customTexts.length > 0) {
      defaults.push({
        sectionType: "text", enabled: true, order: order++, layout: "default",
      });
    }
    defaults.push({
      sectionType: "contact", enabled: true, order: order++, layout: "cards",
    });
    return defaults;
  }, [tenant.sections, tenant.aboutDescription, tenant.aboutImageUrl,
      tenant.heroBlock.bannerImageUrl, tenant.services, tenant.products,
      tenant.payments, tenant.galleryAssets, tenant.customTexts]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -60px 0px" }
      );
      const elements = document.querySelectorAll(
        "[data-reveal]:not([data-revealed])"
      );
      for (const el of elements) observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  const renderSection = (section: PageSectionConfig) => {
    const type = section.sectionType as SectionType;
    const layout = section.layout;

    const sectionId = type;

    switch (type) {
      case "hero":
        return (
          <section key="hero" id="hero">
            <HeroSection
              businessName={tenant.name}
              title={tenant.heroBlock.mainTitle}
              subtitle={tenant.heroBlock.subHeadline}
              bannerImageUrl={tenant.heroBlock.bannerImageUrl}
              accentColor={accentColor}
              ctaText={tenant.heroBlock.ctaText}
              ctaLink={waLink}
              layout={layout as "centered" | "split-right"}
            />
          </section>
        );
      case "about":
        return (
          <section key="about" id="about">
            <AboutSection
              description={tenant.aboutDescription}
              imageUrl={tenant.aboutImageUrl || tenant.heroBlock.bannerImageUrl}
              accentColor={accentColor}
              layout={layout as "text-only" | "image-right" | "image-left"}
            />
          </section>
        );
      case "services":
        return (
          <section key="services" id="services">
            <ServicesSection
              services={tenant.services}
              accentColor={accentColor}
              layout={layout as "grid" | "list"}
            />
          </section>
        );
      case "gallery":
        return (
          <section key="gallery" id="gallery">
            <GallerySection
              assets={tenant.galleryAssets}
              accentColor={accentColor}
              layout={layout as "grid-3" | "grid-4" | "masonry"}
            />
          </section>
        );
      case "products":
        return (
          <section key="products" id="products">
            <ProductsSection
              products={tenant.products}
              accentColor={accentColor}
              layout={layout as "grid" | "card-row"}
            />
          </section>
        );
      case "payments":
        return (
          <section key="payments" id="payments">
            <PaymentsSection
              payments={tenant.payments}
              accentColor={accentColor}
            />
          </section>
        );
      case "contact":
        return (
          <section key="contact" id="contact">
            <ContactSection
              whatsappNumber={tenant.routingEndpoints.whatsappActiveNumber}
              phoneNumber={tenant.contactPhone}
              googleMapsUrl={tenant.routingEndpoints.googleMapsEmbedUrl}
              facebookUrl={tenant.routingEndpoints.facebookProfileUrl}
              instagramHandle={tenant.routingEndpoints.instagramHandle}
              tiktokUrl={tenant.routingEndpoints.tiktokUrl}
              linkedInUrl={tenant.routingEndpoints.linkedInUrl}
              youtubeUrl={tenant.routingEndpoints.youtubeUrl}
              youtubeEmbedUrl={tenant.routingEndpoints.youtubeEmbedUrl}
              googleReviewUrl={tenant.routingEndpoints.googleReviewUrl}
              twitterHandle={tenant.routingEndpoints.twitterHandle}
              telegramHandle={tenant.routingEndpoints.telegramHandle}
              accentColor={accentColor}
              ctaText={tenant.heroBlock.ctaText}
              layout={layout as "cards" | "minimal"}
            />
          </section>
        );
      case "text":
        return (
          <section key="text" id={sectionId}>
            <TextSection
              texts={tenant.customTexts}
              accentColor={accentColor}
            />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink antialiased font-sans">
      <Navbar
        businessName={tenant.name}
        logoUrl={tenant.brandLogoUrl}
        accentColor={accentColor}
        ctaText={tenant.heroBlock.ctaText}
        ctaLink={waLink}
        sections={sections}
      />

      <main>{sections.map(renderSection)}</main>

      <Footer
        businessName={tenant.name}
        logoUrl={tenant.brandLogoUrl}
        facebookUrl={tenant.routingEndpoints.facebookProfileUrl}
        instagramHandle={tenant.routingEndpoints.instagramHandle}
        tiktokUrl={tenant.routingEndpoints.tiktokUrl}
        linkedInUrl={tenant.routingEndpoints.linkedInUrl}
        youtubeUrl={tenant.routingEndpoints.youtubeUrl}
        twitterHandle={tenant.routingEndpoints.twitterHandle}
        telegramHandle={tenant.routingEndpoints.telegramHandle}
        whatsappNumber={tenant.routingEndpoints.whatsappActiveNumber}
        accentColor={accentColor}
        ctaText={tenant.heroBlock.ctaText}
      />
    </div>
  );
}
