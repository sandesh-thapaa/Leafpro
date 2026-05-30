"use client";

import { MessageCircle, Phone, MapPin } from "lucide-react";

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
