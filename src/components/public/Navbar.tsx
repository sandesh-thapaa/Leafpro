"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageCircle, ArrowRight, Menu, X } from "lucide-react";
import type { PageSectionConfig, SectionType } from "@/types/tenant";

const SECTION_LABELS: Partial<Record<SectionType, string>> = {
  about: "About",
  services: "Services",
  gallery: "Gallery",
  products: "Products",
  contact: "Contact",
  text: "Text",
};

interface NavbarProps {
  businessName: string;
  logoUrl?: string;
  accentColor: string;
  ctaText: string;
  ctaLink: string;
  sections: PageSectionConfig[];
}

export function Navbar({
  businessName,
  logoUrl,
  accentColor,
  ctaText,
  ctaLink,
  sections,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = sections.filter(
    (s) => s.enabled && s.sectionType !== "hero" && SECTION_LABELS[s.sectionType as SectionType]
  );

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg shadow-gray-200/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          <div className="flex-1 flex justify-start">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={businessName}
                className="h-10 md:h-12 w-auto max-h-10 md:max-h-12 object-contain rounded-lg"
              />
            ) : (
              <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}>
                {businessName}
              </span>
            )}
          </div>

          {navLinks.length > 0 && (
            <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((s) => (
                <button
                  key={s.sectionType}
                  onClick={() => scrollTo(s.sectionType)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    scrolled
                      ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {SECTION_LABELS[s.sectionType as SectionType]}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all duration-200 ${
              scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/80 hover:bg-white/10"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex-1 flex justify-end">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {menuOpen && navLinks.length > 0 && (
          <div className="md:hidden border-t border-gray-100/20 pb-4 pt-2 mt-1">
            {navLinks.map((s) => (
              <button
                key={s.sectionType}
                onClick={() => scrollTo(s.sectionType)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {SECTION_LABELS[s.sectionType as SectionType]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
