"use client";

import { MessageCircle, Phone, MapPin, Globe } from "lucide-react";

interface ContactSectionProps {
  whatsappNumber: string;
  phoneNumber: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramHandle: string;
  accentColor: string;
  ctaText: string;
  layout?: "cards" | "minimal";
}

export function ContactSection({
  whatsappNumber,
  phoneNumber,
  googleMapsUrl,
  facebookUrl,
  instagramHandle,
  accentColor,
  layout = "cards",
}: ContactSectionProps) {
  const waMsg = encodeURIComponent(
    "Hi, I visited your page on Leafpro and would like to know more."
  );
  const waLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${waMsg}`
    : "#";

  const contactItems = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsappNumber || "Chat on WhatsApp",
      href: waLink,
      isExternal: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: phoneNumber,
      href: phoneNumber ? `tel:${phoneNumber}` : undefined,
      isExternal: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "View on Google Maps",
      href: googleMapsUrl || undefined,
      isExternal: true,
    },
    {
      icon: Globe,
      label: "Social",
      value: facebookUrl || instagramHandle
        ? [facebookUrl && "Facebook", instagramHandle && "Instagram"]
            .filter(Boolean)
            .join(" / ")
        : "Connect with us",
      href: facebookUrl || (instagramHandle ? `https://instagram.com/${instagramHandle}` : undefined),
      isExternal: true,
    },
  ].filter((item) => item.value);

  if (layout === "minimal") {
    return (
      <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span>CONTACT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-8 font-display">
            Get in <span style={{ color: accentColor }}>touch</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <span className="inline-flex items-center gap-2 text-sm text-ink-mute hover:text-ink transition-colors">
                  <Icon className="h-4 w-4" style={{ color: accentColor }} />
                  {item.value}
                </span>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <span key={item.label}>{content}</span>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span>CONTACT</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-14 font-display">
          Get in <span style={{ color: accentColor }}>touch</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div
                  className="flex items-center justify-center w-12 h-12 rounded mb-4"
                  style={{ backgroundColor: `${accentColor}12` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accentColor }} />
                </div>
                <p className="text-xs font-mono tracking-wider text-ink-faint mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-ink">{item.value}</p>
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="group bg-bone border border-paper-dark p-6 hover:bg-paper transition-all duration-200"
                data-reveal
              >
                {content}
              </a>
            ) : (
              <div
                key={item.label}
                className="bg-bone border border-paper-dark p-6"
                data-reveal
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
