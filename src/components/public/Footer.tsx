"use client";

import { MessageCircle } from "lucide-react";

interface SocialLink {
  key: string;
  url: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterProps {
  businessName: string;
  logoUrl?: string;
  facebookUrl: string;
  instagramHandle: string;
  tiktokUrl: string;
  linkedInUrl: string;
  youtubeUrl: string;
  twitterHandle: string;
  telegramHandle: string;
  whatsappNumber: string;
  accentColor: string;
  ctaText: string;
}

export function Footer({
  businessName,
  logoUrl,
  facebookUrl,
  instagramHandle,
  tiktokUrl,
  linkedInUrl,
  youtubeUrl,
  twitterHandle,
  telegramHandle,
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

  const instaUrl = instagramHandle
    ? `https://instagram.com/${instagramHandle.replace(/^@/, "")}`
    : "";
  const twitterUrl = twitterHandle
    ? `https://x.com/${twitterHandle.replace(/^@/, "")}`
    : "";

  const socialLinks: SocialLink[] = [
    { key: "facebook", url: facebookUrl, label: "Facebook", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
    { key: "instagram", url: instaUrl, label: "Instagram", icon: <path d="M7.8 2h8.4C19.41 2 22 4.59 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.59 22 2 19.41 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m4.4 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m4.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> },
    { key: "tiktok", url: tiktokUrl, label: "TikTok", icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /> },
    { key: "linkedin", url: linkedInUrl, label: "LinkedIn", icon: <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </> },
    { key: "youtube", url: youtubeUrl, label: "YouTube", icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
    { key: "twitter", url: twitterUrl, label: "Twitter / X", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
    { key: "telegram", url: telegramHandle, label: "Telegram", icon: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /> },
  ].filter((s) => s.url);

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
              <div className="bg-white/10 rounded-lg p-3 inline-flex">
                <img
                  src={logoUrl}
                  alt={businessName}
                  className="h-12 w-auto max-h-12 object-contain"
                />
              </div>
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
              {socialLinks.length > 0 ? socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      {link.icon}
                    </svg>
                  </span>
                  {link.label}
                </a>
              )) : (
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
