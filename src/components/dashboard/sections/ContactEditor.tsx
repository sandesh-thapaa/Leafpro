"use client";

import { Input } from "@/components/ui/Input";
import type { TenantData } from "@/types/tenant";

interface ContactEditorProps {
  data: TenantData;
  onChange: (field: string, value: string) => void;
}

export function ContactEditor({ data, onChange }: ContactEditorProps) {
  return (
    <div className="space-y-4">
      <Input
        label="WhatsApp Number"
        value={data.routingEndpoints.whatsappActiveNumber}
        onChange={(e) => onChange("routingEndpoints.whatsappActiveNumber", e.target.value)}
        placeholder="9779812345678"
        hint="Nepali number: 97798XXXXXXXX"
      />
      <Input
        label="Phone Number (display)"
        value={data.contactPhone}
        onChange={(e) => onChange("contactPhone", e.target.value)}
        placeholder="Phone number to display"
      />
      <Input
        label="Google Maps Embed URL"
        value={data.routingEndpoints.googleMapsEmbedUrl}
        onChange={(e) => onChange("routingEndpoints.googleMapsEmbedUrl", e.target.value)}
        placeholder="https://maps.google.com/maps?q=..."
      />
      <Input
        label="Facebook Profile URL"
        value={data.routingEndpoints.facebookProfileUrl}
        onChange={(e) => onChange("routingEndpoints.facebookProfileUrl", e.target.value)}
        placeholder="https://facebook.com/yourpage"
      />
      <Input
        label="Instagram Handle"
        value={data.routingEndpoints.instagramHandle}
        onChange={(e) => onChange("routingEndpoints.instagramHandle", e.target.value)}
        placeholder="@yourhandle"
      />
      <Input
        label="TikTok URL"
        value={data.routingEndpoints.tiktokUrl}
        onChange={(e) => onChange("routingEndpoints.tiktokUrl", e.target.value)}
        placeholder="https://tiktok.com/@yourhandle"
      />
      <Input
        label="LinkedIn URL"
        value={data.routingEndpoints.linkedInUrl}
        onChange={(e) => onChange("routingEndpoints.linkedInUrl", e.target.value)}
        placeholder="https://linkedin.com/in/yourprofile"
      />
      <Input
        label="YouTube URL"
        value={data.routingEndpoints.youtubeUrl}
        onChange={(e) => onChange("routingEndpoints.youtubeUrl", e.target.value)}
        placeholder="https://youtube.com/@yourchannel"
      />
      <Input
        label="YouTube Embed URL"
        value={data.routingEndpoints.youtubeEmbedUrl}
        onChange={(e) => onChange("routingEndpoints.youtubeEmbedUrl", e.target.value)}
        placeholder="https://www.youtube.com/embed/VIDEO_ID"
        hint="Paste the embed URL from YouTube (share → embed)"
      />
      <Input
        label="Google Review Link"
        value={data.routingEndpoints.googleReviewUrl}
        onChange={(e) => onChange("routingEndpoints.googleReviewUrl", e.target.value)}
        placeholder="https://search.google.com/local/writereview?placeid=..."
        hint="Paste your Google Review link to show a 'Give a Review' button"
      />
      <Input
        label="Twitter / X Handle"
        value={data.routingEndpoints.twitterHandle}
        onChange={(e) => onChange("routingEndpoints.twitterHandle", e.target.value)}
        placeholder="@yourhandle"
      />
      <Input
        label="Telegram URL"
        value={data.routingEndpoints.telegramHandle}
        onChange={(e) => onChange("routingEndpoints.telegramHandle", e.target.value)}
        placeholder="https://t.me/yourusername"
      />
    </div>
  );
}
