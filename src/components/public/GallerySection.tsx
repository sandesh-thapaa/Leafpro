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
      ? "grid-cols-1 md:grid-cols-4"
      : layout === "masonry"
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            Gallery
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Featured <span style={{ color: accentColor }}>Work</span>
          </h2>
        </div>

        <div className={`grid ${gridCols} gap-4 md:gap-6`}>
          {assets.map((asset, index) => (
            <button
              key={asset._id || index}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg shadow-gray-200/30 ${
                layout === "masonry" && index % 3 === 0
                  ? "aspect-[4/5] row-span-2"
                  : "aspect-square"
              }`}
              data-reveal
            >
              <img
                src={asset.assetUrl}
                alt={asset.assetCaption || ""}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-6"
                style={{
                  background: `linear-gradient(to top, ${accentColor}e0, transparent)`,
                }}
              >
                {asset.assetCaption && (
                  <span className="text-white text-base font-bold">
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-6 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-6 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <img
            src={assets[lightboxIndex].assetUrl}
            alt={assets[lightboxIndex].assetCaption || ""}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />

          {assets[lightboxIndex].assetCaption && (
            <p className="absolute bottom-8 left-0 right-0 text-center text-white/70 text-base font-medium">
              {assets[lightboxIndex].assetCaption}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
