"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { PaymentQr } from "@/types/tenant";

interface PaymentsSectionProps {
  payments: PaymentQr[];
  accentColor: string;
}

export function PaymentsSection({ payments, accentColor }: PaymentsSectionProps) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  if (!payments || payments.length === 0) return null;

  return (
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            Payments
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Pay <span style={{ color: accentColor }}>Online</span>
          </h2>
        </div>

        <div className={`${payments.length === 1 ? "flex justify-center" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-6 max-w-4xl mx-auto`}>
          {payments
            .sort((a, b) => a.order - b.order)
            .map((qr, index) => (
              <button
                key={qr._id || index}
                onClick={() => setLightboxUrl(qr.imageUrl)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center gap-3"
                data-reveal
              >
                <div className="w-full aspect-square max-w-[200px]">
                  <img
                    src={qr.imageUrl}
                    alt={qr.label || "Payment QR"}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                {qr.label && (
                  <span className="text-sm font-bold text-gray-700">{qr.label}</span>
                )}
              </button>
            ))}
        </div>
      </div>

      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxUrl}
            alt="QR Code"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
