"use client";

interface AboutSectionProps {
  description: string;
  imageUrl?: string;
  accentColor: string;
  layout?: "text-only" | "image-right" | "image-left";
}

export function AboutSection({
  description,
  imageUrl,
  accentColor,
  layout = "text-only",
}: AboutSectionProps) {
  if (!description) return null;

  const hasImage = !!imageUrl;
  const effectiveLayout = hasImage ? layout : "text-only";

  if (effectiveLayout === "text-only") {
    return (
      <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span>ABOUT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6 font-display">
            Our story
          </h2>
          <p className="text-base text-ink-mute leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </section>
    );
  }

  const isImageRight = effectiveLayout === "image-right";

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
      <div className="max-w-6xl mx-auto">
          <div
            className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center`}
          >
          <div className={!isImageRight ? "md:order-2" : ""}>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span>ABOUT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6 font-display">
              Our story
            </h2>
            <p className="text-base text-ink-mute leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className={!isImageRight ? "md:order-1" : ""} data-reveal={isImageRight ? "right" : "left"}>
            <div className="relative rounded overflow-hidden border border-paper-dark">
              <img
                src={imageUrl}
                alt="About us"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
