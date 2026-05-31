"use client";

import { useEffect, useState } from "react";

interface PortfolioItem {
  name: string;
  slug: string;
  thumbnailUrl: string;
  description: string;
  accentColor: string;
}

export function CustomerShowcase() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/v1/tenants/portfolio");
        const data = await res.json();
        if (data.success) setItems(data.data || []);
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 md:py-32 px-6 lg:px-8 bg-bone">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-3 w-20 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-80 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-bone">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-widest text-brand uppercase mb-4 inline-block">
            Featured Businesses
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-3 font-display">
            See what others built
          </h2>
          <p className="text-ink-mute text-sm max-w-lg mx-auto">
            Real businesses using Leafpro to connect with customers instantly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl border border-paper-dark overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="aspect-video overflow-hidden bg-gradient-to-br"
                style={{
                  background: item.thumbnailUrl
                    ? undefined
                    : `linear-gradient(135deg, ${item.accentColor}22, ${item.accentColor}44)`,
                }}
              >
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="text-5xl font-bold opacity-30"
                      style={{ color: item.accentColor }}
                    >
                      {item.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-ink group-hover:text-brand transition-colors">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-ink-mute mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
