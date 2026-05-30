"use client";

import { Sparkles } from "lucide-react";
import type { ServiceOffering } from "@/types/tenant";

interface ServicesSectionProps {
  services: ServiceOffering[];
  accentColor: string;
  layout?: "grid" | "list";
}

export function ServicesSection({
  services,
  accentColor,
  layout = "grid",
}: ServicesSectionProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span>SERVICES</span>
        </div>

        <div className="max-w-lg mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
            What we <span style={{ color: accentColor }}>offer</span>
          </h2>
        </div>

        {layout === "list" ? (
          <div className="space-y-px bg-paper-dark">
            {services.map((service, index) => (
              <div
                key={service.title + index}
                className="bg-bone p-6 flex items-start gap-5 transition-all duration-200 hover:bg-paper"
                data-reveal
              >
                <span className="text-2xl shrink-0 mt-0.5">{service.icon || "✨"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-base font-semibold text-ink">
                      {service.title}
                    </h3>
                    {service.isPopular && (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider px-2 py-0.5 rounded shrink-0"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                        }}
                      >
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-mute leading-relaxed">
                    {service.description}
                  </p>
                  {service.price && (
                    <p
                      className="mt-2 text-sm font-semibold"
                      style={{ color: accentColor }}
                    >
                      {service.price}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-dark">
            {services.map((service, index) => (
              <div
                key={service.title + index}
                className="bg-bone p-7 h-full transition-all duration-200 hover:bg-paper"
                data-reveal
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{service.icon || "✨"}</span>
                  {service.isPopular && (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-ink mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-ink-mute leading-relaxed">
                  {service.description}
                </p>
                {service.price && (
                  <p
                    className="mt-4 text-base font-semibold"
                    style={{ color: accentColor }}
                  >
                    {service.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
