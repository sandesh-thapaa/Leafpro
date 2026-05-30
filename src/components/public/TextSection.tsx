"use client";

import type { CustomTextSection } from "@/types/tenant";

interface TextSectionProps {
  texts: CustomTextSection[];
  accentColor: string;
  layout?: "default";
}

export function TextSection({
  texts,
  accentColor,
}: TextSectionProps) {
  if (!texts || texts.length === 0) return null;

  const sorted = [...texts].sort((a, b) => a.order - b.order);

  return (
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto space-y-24">
        {sorted.map((text, index) => (
          <div
            key={text._id || index}
            className="max-w-4xl mx-auto text-center"
            data-reveal
          >
            {text.title && (
              <>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                  style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  {text.title}
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                  {text.title}
                </h2>
              </>
            )}
            <div className="text-lg sm:text-xl text-gray-500 leading-relaxed whitespace-pre-line">
              {text.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
