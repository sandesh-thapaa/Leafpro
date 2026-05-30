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
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50" />
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            Products
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Our <span style={{ color: accentColor }}>Products</span>
          </h2>
        </div>

        {layout === "card-row" ? (
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none">
            {sorted.map((product, index) => (
              <div
                key={product.title + index}
                className="group min-w-[300px] max-w-[340px] bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/30 p-6 snap-start shrink-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-reveal
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-5">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 truncate">
                    {product.title}
                  </h3>
                  {product.isPopular && (
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
                <p className="text-gray-500 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                {product.price && (
                  <p
                    className="mt-3 text-xl font-bold"
                    style={{ color: accentColor }}
                  >
                    {product.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sorted.map((product, index) => (
              <div
                key={product.title + index}
                className="group bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/30 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-reveal
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-5">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 truncate">
                    {product.title}
                  </h3>
                  {product.isPopular && (
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
                  {product.description}
                </p>
                {product.price && (
                  <p
                    className="mt-3 text-xl font-bold"
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
