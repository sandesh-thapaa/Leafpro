"use client";

import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import type { TenantData } from "@/types/tenant";

interface HeroEditorProps {
  data: TenantData;
  onChange: (field: string, value: string) => void;
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Business Name"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="Your business name"
      />
      <Input
        label="Hero Title"
        value={data.heroBlock.mainTitle}
        onChange={(e) => onChange("heroBlock.mainTitle", e.target.value)}
        placeholder="Main headline"
      />
      <Input
        label="Subtitle"
        value={data.heroBlock.subHeadline}
        onChange={(e) => onChange("heroBlock.subHeadline", e.target.value)}
        placeholder="A short description"
      />
      <Input
        label="CTA Button Text"
        value={data.heroBlock.ctaText}
        onChange={(e) => onChange("heroBlock.ctaText", e.target.value)}
        placeholder="Contact Us"
      />
      <ImageUpload
        label="Hero Image"
        value={data.heroBlock.bannerImageUrl}
        onChange={(url) => onChange("heroBlock.bannerImageUrl", url)}
      />
    </div>
  );
}
