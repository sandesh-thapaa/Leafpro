"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Plus, Trash2, Sparkles } from "lucide-react";
import type { ServiceOffering } from "@/types/tenant";

interface ServicesEditorProps {
  services: ServiceOffering[];
  onChange: (services: ServiceOffering[]) => void;
}

export function ServicesEditor({ services, onChange }: ServicesEditorProps) {
  const add = () =>
    onChange([
      ...services,
      { title: "", description: "", icon: "✨", price: "", isPopular: false },
    ]);

  const remove = (index: number) =>
    onChange(services.filter((_, i) => i !== index));

  const update = (index: number, field: keyof ServiceOffering, value: string | boolean) =>
    onChange(services.map((s, i) => (i === index ? { ...s, [field]: value } : s)));

  return (
    <div className="space-y-3">
      {services.length === 0 ? (
        <div className="text-center py-8 text-ink-faint">
          <Sparkles className="h-6 w-6 mx-auto mb-2" />
          <p className="text-sm">No services yet.</p>
        </div>
      ) : (
        services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded bg-bone border border-paper-dark"
          >
            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              <Input
                label="Title"
                value={service.title}
                onChange={(e) => update(index, "title", e.target.value)}
                placeholder="Service name"
              />
              <Input
                label="Icon (emoji)"
                value={service.icon}
                onChange={(e) => update(index, "icon", e.target.value)}
                placeholder="✨"
              />
              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  value={service.description}
                  onChange={(e) => update(index, "description", e.target.value)}
                  placeholder="Describe this service"
                  rows={2}
                />
              </div>
              <Input
                label="Price (optional)"
                value={service.price}
                onChange={(e) => update(index, "price", e.target.value)}
                placeholder="NPR 1,000"
              />
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={service.isPopular}
                    onChange={(e) => update(index, "isPopular", e.target.checked)}
                    className="rounded border-paper-dark text-coral focus:ring-coral/30"
                  />
                  <span className="text-sm text-ink-mute">Popular</span>
                </label>
              </div>
            </div>
            <button
              onClick={() => remove(index)}
              className="mt-6 p-2 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))
      )}
      <button
        onClick={add}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral/80 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Service
      </button>
    </div>
  );
}
