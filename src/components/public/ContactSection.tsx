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
      icon: (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </>
      ),
    },
    {
      key: "tiktok",
      url: tiktokUrl,
      label: "TikTok",
      icon: <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />,
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
