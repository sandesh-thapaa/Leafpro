"use client";

import { MessageCircle } from "lucide-react";

interface FooterProps {
  businessName: string;
  logoUrl?: string;
  facebookUrl: string;
  instagramHandle: string;
  whatsappNumber: string;
  accentColor: string;
  ctaText: string;
}

export function Footer({
  businessName,
  logoUrl,
  facebookUrl,
  instagramHandle,
  whatsappNumber,
  accentColor,
  ctaText,
}: FooterProps) {
  const waMsg = encodeURIComponent(
    "Hi, I visited your page on Leafpro and would like to know more."
  );
  const waLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${waMsg}`
    : "#";

  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={businessName}
                className="h-12 w-auto max-h-12 object-contain rounded-lg brightness-0 invert"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {businessName}
              </span>
            )}
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Building something great with Leafpro.
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Follow Us
            </h3>
            <div className="flex flex-col gap-3">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </span>
                  Facebook
                </a>
              )}
              {instagramHandle && (
                <a
                  href={`https://instagram.com/${instagramHandle.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </span>
                  Instagram
                </a>
              )}
              {!facebookUrl && !instagramHandle && (
                <p className="text-sm text-gray-600">No social links added yet</p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Contact
            </h3>
            {whatsappNumber ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                style={{ backgroundColor: accentColor }}
              >
                <MessageCircle className="h-4 w-4" />
                {ctaText}
              </a>
            ) : (
              <p className="text-sm text-gray-600">No contact number set</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Powered by{" "}
            <a
              href="/"
              className="font-bold transition-colors hover:text-white"
              style={{ color: accentColor }}
            >
              Leafpro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
