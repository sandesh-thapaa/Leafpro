"use client";

import { MessageCircle, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  businessName: string;
  title: string;
  subtitle: string;
  bannerImageUrl?: string;
  accentColor: string;
  ctaText: string;
  ctaLink: string;
  layout?: "centered" | "split-right";
}

export function HeroSection({
  businessName,
  title,
  subtitle,
  bannerImageUrl,
  accentColor,
  ctaText,
  ctaLink,
  layout = "centered",
}: HeroSectionProps) {
  const hasImage = !!bannerImageUrl;
  const effectiveLayout = hasImage ? layout : "centered";

  if (effectiveLayout === "split-right") {
    return (
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: `linear-gradient(135deg, ${accentColor}08 0%, ${accentColor}15 50%, ${accentColor}05 100%)`,
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: accentColor, filter: "blur(80px)" }}
        />

        <div className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                  style={{
                    backgroundColor: `${accentColor}12`,
                    color: accentColor,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  {businessName}
                </div>

                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.08] mb-6 text-gray-900">
                  {title}
                </h1>

                {subtitle && (
                  <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
                    {subtitle}
                  </p>
                )}

                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 hover:brightness-110 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                  style={{ backgroundColor: accentColor }}
                >
                  <MessageCircle className="h-5 w-5" />
                  {ctaText}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>

              <div className="relative" data-reveal="right">
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30"
                  style={{ backgroundColor: accentColor, filter: "blur(30px)" }}
                />
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl">
                  <img
                    src={bannerImageUrl}
                    alt=""
                    className="w-full aspect-[4/3] object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {hasImage ? (
        <>
          <img
            src={bannerImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/40" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #0f0f1a 0%, ${accentColor}dd 50%, #0f0f1a 100%)`,
          }}
        />
      )}

      {!hasImage && (
        <>
          <div
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-30"
            style={{ backgroundColor: accentColor, filter: "blur(120px)" }}
          />
          <div
            className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-20"
            style={{ backgroundColor: "#fff", filter: "blur(100px)" }}
          />
        </>
      )}

      <div className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            style={{
              backgroundColor: hasImage ? "rgba(255,255,255,0.1)" : `${accentColor}20`,
              color: hasImage ? "rgba(255,255,255,0.8)" : "#fff",
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            {businessName}
          </div>

          <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 text-white/70">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 hover:brightness-110 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              <MessageCircle className="h-5 w-5" />
              {ctaText}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
