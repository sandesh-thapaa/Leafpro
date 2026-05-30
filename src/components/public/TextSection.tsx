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
  layout: _layout,
}: TextSectionProps) {
  if (!texts || texts.length === 0) return null;

  const sorted = [...texts].sort((a, b) => a.order - b.order);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
      <div className="max-w-6xl mx-auto space-y-16">
        {sorted.map((text, index) => (
          <div
            key={text._id || index}
            className="max-w-3xl mx-auto text-center"
            data-reveal
          >
            {text.title && (
              <>
                <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>{text.title.toUpperCase()}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6 font-display">
                  {text.title}
                </h2>
              </>
            )}
            <div className="text-base text-ink-mute leading-relaxed whitespace-pre-line">
              {text.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
