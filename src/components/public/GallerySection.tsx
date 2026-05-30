"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryAsset } from "@/types/tenant";

interface GallerySectionProps {
  assets: GalleryAsset[];
  accentColor: string;
  layout?: "grid-3" | "grid-4" | "masonry";
}

export function GallerySection({
  assets,
  accentColor,
  layout = "grid-3",
}: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!assets || assets.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % assets.length);
    }
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + assets.length) % assets.length);
    }
  };

  const gridCols =
    layout === "grid-4"
      ? "grid-cols-2 md:grid-cols-4"
      : layout === "masonry"
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3";

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span>GALLERY</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-14 font-display">
          Featured <span style={{ color: accentColor }}>work</span>
        </h2>

        <div className={`grid ${gridCols} gap-px bg-paper-dark`}>
          {assets.map((asset, index) => (
            <button
              key={asset._id || index}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden bg-bone ${
                layout === "masonry" && index % 3 === 0
                  ? "aspect-[4/5] row-span-2"
                  : "aspect-square"
              }`}
              data-reveal
            >
              <img
                src={asset.thumbnailUrl || asset.assetUrl}
                alt={asset.assetCaption || ""}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{
                  background: `linear-gradient(to top, ${accentColor}cc, transparent)`,
                }}
              >
                {asset.assetCaption && (
                  <span className="text-white text-sm font-medium">
                    {asset.assetCaption}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <img
            src={assets[lightboxIndex].assetUrl}
            alt={assets[lightboxIndex].assetCaption || ""}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />

          {assets[lightboxIndex].assetCaption && (
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">
              {assets[lightboxIndex].assetCaption}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
