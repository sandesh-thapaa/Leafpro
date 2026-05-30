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
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50" />
      <div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            Services
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            What We <span style={{ color: accentColor }}>Offer</span>
          </h2>
        </div>

        {layout === "list" ? (
          <div className="max-w-4xl mx-auto space-y-5">
            {services.map((service, index) => (
              <div
                key={service.title + index}
                className="group bg-white rounded-2xl p-6 md:p-8 flex items-start gap-6 shadow-lg shadow-gray-200/40 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                data-reveal
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${accentColor}12` }}
                >
                  <span className="text-2xl">{service.icon || "✨"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    {service.isPopular && (
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shrink-0"
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
                  <p className="text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                  {service.price && (
                    <p
                      className="mt-3 text-lg font-bold"
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service.title + index}
                className="group bg-white rounded-3xl p-8 shadow-lg shadow-gray-200/40 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-reveal
              >
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${accentColor}12` }}
                >
                  <span className="text-3xl">{service.icon || "✨"}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  {service.isPopular && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
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
                <p className="text-gray-500 leading-relaxed">
                  {service.description}
                </p>
                {service.price && (
                  <p
                    className="mt-4 text-xl font-bold"
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
