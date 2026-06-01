"use client";

import { MessageCircle, Phone, MapPin } from "lucide-react";

interface SocialLink {
  key: string;
  url: string;
  label: string;
  icon: React.ReactNode;
}

interface ContactSectionProps {
  whatsappNumber: string;
  phoneNumber: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramHandle: string;
  tiktokUrl: string;
  linkedInUrl: string;
  youtubeUrl: string;
  twitterHandle: string;
  telegramHandle: string;
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
  tiktokUrl,
  linkedInUrl,
  youtubeUrl,
  twitterHandle,
  telegramHandle,
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
    },
    {
      icon: Phone,
      label: "Phone",
      value: phoneNumber,
      href: phoneNumber ? `tel:${phoneNumber}` : undefined,
    },
  ].filter((item) => item.value);

  const hasMap = googleMapsUrl && googleMapsUrl.includes("embed");

  const socialLinks: SocialLink[] = [
    {
      key: "facebook",
      url: facebookUrl,
      label: "Facebook",
      icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    },
    {
      key: "instagram",
      url: instagramHandle
        ? `https://instagram.com/${instagramHandle.replace(/^@/, "")}`
        : "",
      label: "Instagram",
      icon: <path d="M7.8 2h8.4C19.41 2 22 4.59 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.59 22 2 19.41 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m4.4 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m4.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />,
    },
    {
      key: "tiktok",
      url: tiktokUrl,
      label: "TikTok",
      icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
    },
    {
      key: "linkedin",
      url: linkedInUrl,
      label: "LinkedIn",
      icon: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
    {
      key: "youtube",
      url: youtubeUrl,
      label: "YouTube",
      icon: <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C19.51 20.55 19.97 18.196 20 12c-.03-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />,
    },
    {
      key: "twitter",
      url: twitterHandle
        ? `https://x.com/${twitterHandle.replace(/^@/, "")}`
        : "",
      label: "Twitter / X",
      icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    },
    {
      key: "telegram",
      url: telegramHandle,
      label: "Telegram",
      icon: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />,
    },
  ].filter((s) => s.url) as SocialLink[];

  const renderSocialCard = (link: SocialLink) => (
    <a
      key={link.key}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      data-reveal
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
          style={{
            backgroundColor: `${accentColor}12`,
            boxShadow: `0 4px 20px ${accentColor}20`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" style={{ color: accentColor }}>
            {link.icon}
          </svg>
        </div>
        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">{link.label}</p>
        <p className="text-lg font-bold text-gray-900 truncate max-w-[200px]">{link.label}</p>
      </div>
    </a>
  );

  const sectionBg = {
    background: `linear-gradient(180deg, ${accentColor}06 0%, white 30%, white 70%, ${accentColor}06 100%)`,
  };

  if (layout === "minimal") {
    return (
      <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden" style={sectionBg}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            Contact
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
            Get in <span style={{ color: accentColor }}>Touch</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <span className="inline-flex items-center gap-3 text-lg text-gray-500 hover:text-gray-900 transition-colors font-medium">
                  <Icon className="h-5 w-5" style={{ color: accentColor }} />
                  {item.value}
                </span>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <span key={item.label}>{content}</span>
              );
            })}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{ color: accentColor }}>
                    {link.icon}
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {hasMap && (
            <div className="mt-12 rounded-2xl overflow-hidden border border-gray-200 shadow-xl h-[300px] md:h-[400px]">
              <iframe
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (!hasMap) {
    return (
      <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden" style={sectionBg}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              Contact
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Get in <span style={{ color: accentColor }}>Touch</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              We&apos;d love to hear from you. Reach out through any of the channels below.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex flex-col items-center text-center">
                  <div
                    className="flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-xl"
                    style={{
                      backgroundColor: `${accentColor}12`,
                      boxShadow: `0 8px 32px ${accentColor}20`,
                    }}
                  >
                    <Icon className="h-9 w-9" style={{ color: accentColor }} />
                  </div>
                  <p className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-2">
                    {item.label}
                  </p>
                  <p className="text-xl font-bold text-gray-900">{item.value}</p>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-3xl p-10 min-w-[260px] shadow-lg shadow-gray-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  data-reveal
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="bg-white border border-gray-100 rounded-3xl p-10 min-w-[260px] shadow-lg shadow-gray-200/30"
                  data-reveal
                >
                  {content}
                </div>
              );
            })}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-16">
              <h3 className="text-center text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">
                Follow Us
              </h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {socialLinks.map(renderSocialCard)}
              </div>
            </div>
          )}

          {googleMapsUrl && !hasMap && (
            <div className="text-center mt-10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-28 md:py-40 px-6 lg:px-8 overflow-hidden" style={sectionBg}>
      <div
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: accentColor, filter: "blur(100px)" }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            Contact
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Get in <span style={{ color: accentColor }}>Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="grid sm:grid-cols-2 gap-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div
                      className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
                      style={{
                        backgroundColor: `${accentColor}12`,
                        boxShadow: `0 4px 20px ${accentColor}20`,
                      }}
                    >
                      <Icon className="h-7 w-7" style={{ color: accentColor }} />
                    </div>
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border border-gray-100 rounded-3xl p-8 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    data-reveal
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg shadow-gray-200/30"
                    data-reveal
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
                  Follow Us
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {socialLinks.map(renderSocialCard)}
                </div>
              </div>
            )}

            {googleMapsUrl && !hasMap && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
              >
                <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                View on Google Maps
              </a>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl h-[350px] md:h-[500px]">
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Business Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
