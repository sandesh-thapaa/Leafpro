"use client";

import { MessageCircle } from "lucide-react";

interface FooterProps {
  businessName: string;
  facebookUrl: string;
  instagramHandle: string;
  accentColor: string;
}

export function Footer({
  businessName,
  facebookUrl,
  instagramHandle,
  accentColor,
}: FooterProps) {
  return (
    <footer className="py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-lg font-semibold font-display text-ink">
              {businessName}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-mute hover:text-ink transition-colors"
              >
                Facebook
              </a>
            )}
            {instagramHandle && (
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-mute hover:text-ink transition-colors"
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-paper-dark pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Powered by{" "}
            <a
              href="/"
              className="font-medium transition-colors"
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
