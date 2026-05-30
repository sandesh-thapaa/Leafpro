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
      <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${accentColor}04 0%, white 50%, ${accentColor}04 100%)`,
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            About
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
            Our Story
          </h2>
          <div className="text-lg sm:text-xl text-gray-500 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {description}
          </div>
        </div>
      </section>
    );
  }

  const isImageRight = effectiveLayout === "image-right";

  return (
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${accentColor}04 0%, white 50%, ${accentColor}04 100%)`,
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={!isImageRight ? "md:order-2" : ""}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              About
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Our Story
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className={!isImageRight ? "md:order-1" : ""} data-reveal={isImageRight ? "right" : "left"}>
            <div
              className="absolute -inset-4 rounded-3xl opacity-20"
              style={{ backgroundColor: accentColor, filter: "blur(40px)" }}
            />
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl">
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
