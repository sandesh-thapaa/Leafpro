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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-bone to-paper-warm" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ backgroundColor: `${accentColor}12` }}
          />
          <div
            className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ backgroundColor: `${accentColor}08` }}
          />
        </div>

        <div className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-ink-faint mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>{businessName}</span>
                </div>

                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-[1.06] mb-5 font-display text-ink">
                  {title}
                </h1>

                {subtitle && (
                  <p className="text-base sm:text-lg text-ink-mute leading-relaxed mb-8 max-w-lg">
                    {subtitle}
                  </p>
                )}

                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold tracking-wide text-bone transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: accentColor }}
                >
                  <MessageCircle className="h-4 w-4" />
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="relative" data-reveal="right">
                <div className="relative rounded overflow-hidden border border-paper-dark shadow-xl">
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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {hasImage ? (
        <>
          <img
            src={bannerImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-bone to-paper-warm" />
      )}

      {!hasImage && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ backgroundColor: `${accentColor}12` }}
          />
          <div
            className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ backgroundColor: `${accentColor}08` }}
          />
        </div>
      )}

      <div className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {hasImage && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-white/50 mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span>{businessName}</span>
            </div>
          )}

          <h1
            className={`text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.06] mb-5 font-display ${
              hasImage ? "text-bone" : "text-ink"
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-9 ${
                hasImage ? "text-white/70" : "text-ink-mute"
              }`}
            >
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold tracking-wide text-bone transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: accentColor }}
            >
              <MessageCircle className="h-4 w-4" />
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
