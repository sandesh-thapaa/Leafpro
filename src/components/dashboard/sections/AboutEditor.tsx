"use client";

import { Textarea } from "@/components/ui/Textarea";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import type { TenantData } from "@/types/tenant";

interface AboutEditorProps {
  data: TenantData;
  onChange: (field: string, value: string) => void;
}

export function AboutEditor({ data, onChange }: AboutEditorProps) {
  return (
    <div className="space-y-4">
      <Textarea
        label="About Description"
        value={data.aboutDescription}
        onChange={(e) => onChange("aboutDescription", e.target.value)}
        placeholder="Tell your story..."
        rows={5}
      />
      <ImageUpload
        label="About Image"
        value={data.aboutImageUrl}
        onChange={(url) => onChange("aboutImageUrl", url)}
      />
    </div>
  );
}
