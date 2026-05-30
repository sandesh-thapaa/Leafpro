"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

interface NavbarProps {
  businessName: string;
  logoUrl?: string;
  accentColor: string;
  ctaText: string;
  ctaLink: string;
}

export function Navbar({
  businessName,
  logoUrl,
  accentColor,
  ctaText,
  ctaLink,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-paper-dark"
          : "bg-paper/60 backdrop-blur-sm border-b border-paper-dark/50"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={businessName}
                className="h-8 w-auto max-h-8 object-contain rounded"
              />
            ) : (
              <span className="text-base font-semibold tracking-tight font-display text-ink">
                {businessName}
              </span>
            )}
          </div>

          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold tracking-wide text-bone transition-all duration-200 active:scale-[0.97] hover:brightness-110"
            style={{ backgroundColor: accentColor }}
          >
            <MessageCircle className="h-4 w-4" />
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
