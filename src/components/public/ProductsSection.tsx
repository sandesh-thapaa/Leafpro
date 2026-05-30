"use client";

import { Sparkles, ShoppingBag } from "lucide-react";
import type { ProductItem } from "@/types/tenant";

interface ProductsSectionProps {
  products: ProductItem[];
  accentColor: string;
  layout?: "grid" | "card-row";
}

export function ProductsSection({
  products,
  accentColor,
  layout = "grid",
}: ProductsSectionProps) {
  if (!products || products.length === 0) return null;

  const sorted = [...products].sort((a, b) => a.order - b.order);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span>PRODUCTS</span>
        </div>

        <div className="max-w-lg mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
            Our <span style={{ color: accentColor }}>products</span>
          </h2>
        </div>

        {layout === "card-row" ? (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {sorted.map((product, index) => (
              <div
                key={product.title + index}
                className="min-w-[280px] max-w-[320px] bg-bone border border-paper-dark p-5 snap-start shrink-0 transition-all duration-200 hover:bg-paper"
                data-reveal
              >
                <div className="aspect-square rounded overflow-hidden bg-paper-dark mb-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-ink-faint" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-ink truncate">
                    {product.title}
                  </h3>
                  {product.isPopular && (
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
                <p className="text-sm text-ink-mute leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                {product.price && (
                  <p
                    className="mt-3 text-base font-semibold"
                    style={{ color: accentColor }}
                  >
                    {product.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-dark">
            {sorted.map((product, index) => (
              <div
                key={product.title + index}
                className="bg-bone p-6 h-full transition-all duration-200 hover:bg-paper"
                data-reveal
              >
                <div className="aspect-square rounded overflow-hidden bg-paper-dark mb-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-ink-faint" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-semibold text-ink truncate">
                    {product.title}
                  </h3>
                  {product.isPopular && (
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
                  {product.description}
                </p>
                {product.price && (
                  <p
                    className="mt-3 text-base font-semibold"
                    style={{ color: accentColor }}
                  >
                    {product.price}
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
