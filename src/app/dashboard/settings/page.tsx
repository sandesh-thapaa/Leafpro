"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { PageSpinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { THEME_PRESETS, CTA_OPTIONS, NEPALI_PHONE_REGEX } from "@/lib/constants";
import { Check, Copy, Download, Share2, QrCode } from "lucide-react";
import type { TenantData } from "@/types/tenant";

export default function SettingsPage() {
  const { showToast } = useToast();
  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const [accentColor, setAccentColor] = useState("#3b82f6");
  const [ctaText, setCtaText] = useState("Contact Us");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/v1/dashboard/profile");
      const data = await res.json();
      if (data.success) {
        const t = data.data as TenantData;
        setTenant(t);
        setAccentColor(t.accentColorHex || "#3b82f6");
        setCtaText(t.heroBlock.ctaText || "Contact Us");
        setWhatsappNumber(t.routingEndpoints.whatsappActiveNumber || "");
        setGoogleMapsUrl(t.routingEndpoints.googleMapsEmbedUrl || "");
        setFacebookUrl(t.routingEndpoints.facebookProfileUrl || "");
        setInstagramHandle(t.routingEndpoints.instagramHandle || "");
      }
    } catch {
      showToast("Failed to load settings", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const saveSettings = useCallback(async () => {
    setIsSaving(true);
    try {
      const body: Record<string, unknown> = {
        accentColorHex: accentColor,
        routingEndpoints: {
          whatsappActiveNumber: whatsappNumber,
          googleMapsEmbedUrl: googleMapsUrl,
          facebookProfileUrl: facebookUrl,
          instagramHandle: instagramHandle,
        },
      };

      if (ctaText) {
        body.heroBlock = { ctaText };
      }

      const res = await fetch("/api/v1/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Failed to save", "error");
        return;
      }
      showToast("Settings saved!", "success");
    } catch {
      showToast("Failed to save settings", "error");
    } finally {
      setIsSaving(false);
    }
  }, [accentColor, ctaText, whatsappNumber, googleMapsUrl, facebookUrl, instagramHandle, showToast]);

  const copyPageUrl = async () => {
    if (!tenant) return;
    const url = `${window.location.origin}/${tenant.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("URL copied!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy", "error");
    }
  };

  if (isLoading) return <PageSpinner />;
  if (!tenant) return <p className="text-gray-500 text-center py-20">Failed to load data.</p>;

  const pageUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${tenant.slug}`;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">
            Customize your page appearance and links
          </p>
        </div>
        <Button onClick={saveSettings} isLoading={isSaving}>
          Save Settings
        </Button>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Branding
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Accent Color
            </label>
            <div className="flex flex-wrap gap-3 mb-4">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  onClick={() => setAccentColor(preset.hex)}
                  className={`
                    w-10 h-10 rounded-xl transition-all duration-200
                    ${
                      accentColor === preset.hex
                        ? "ring-2 ring-offset-2 scale-110"
                        : "hover:scale-105"
                    }
                  `}
                  style={{
                    backgroundColor: preset.hex,
                  }}
                  aria-label={preset.name}
                  title={preset.name}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-gray-200"
              />
              <Input
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                placeholder="#3b82f6"
                className="w-32 font-mono text-sm"
              />
              <div
                className="w-8 h-8 rounded-lg border border-gray-200"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              CTA Button Text
            </label>
            <div className="flex flex-wrap gap-2">
              {CTA_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setCtaText(option)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      ctaText === option
                        ? "bg-accent text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Contact & Links
        </h2>
        <div className="space-y-5">
          <Input
            label="WhatsApp Number"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="9779812345678"
            hint="Nepali number: 97798XXXXXXXX"
          />
          <Input
            label="Google Maps Embed URL"
            value={googleMapsUrl}
            onChange={(e) => setGoogleMapsUrl(e.target.value)}
            placeholder="https://maps.google.com/maps?q=..."
          />
          <Input
            label="Facebook Profile URL"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            placeholder="https://facebook.com/yourpage"
          />
          <Input
            label="Instagram Handle"
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(e.target.value)}
            placeholder="@yourhandle"
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Share Your Page
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <code className="flex-1 text-sm text-gray-600 truncate">
              {pageUrl}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyPageUrl}
              leftIcon={
                copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )
              }
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${
                whatsappNumber?.replace(/[^0-9]/g, "") || "97798XXXXXXXX"
              }?text=Check out my page: ${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 text-green-700 font-medium text-sm hover:bg-green-100 transition-all"
            >
              <Share2 className="h-4 w-4" />
              Share on WhatsApp
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
