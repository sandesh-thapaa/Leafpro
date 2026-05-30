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
    </div>
  );
}
