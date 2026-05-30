"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { Plus, Trash2, GripVertical, Save, Check, Sparkles } from "lucide-react";
import type { TenantData, ServiceOffering } from "@/types/tenant";

interface ContentFormProps {
  tenant: TenantData;
  onSave?: () => void;
}

export function ContentForm({ tenant, onSave }: ContentFormProps) {
  const { showToast } = useToast();

  const [name, setName] = useState(tenant.name);
  const [heroTitle, setHeroTitle] = useState(tenant.heroBlock.mainTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(tenant.heroBlock.subHeadline);
  const [ctaText, setCtaText] = useState(tenant.heroBlock.ctaText);
  const [aboutText, setAboutText] = useState(tenant.aboutDescription);
  const [services, setServices] = useState<ServiceOffering[]>(tenant.services || []);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/v1/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          heroBlock: { mainTitle: heroTitle, subHeadline: heroSubtitle, ctaText },
          aboutDescription: aboutText,
          services,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Failed to save", "error");
        return;
      }

      setLastSaved(new Date());
      onSave?.();
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setIsSaving(false);
    }
  }, [name, heroTitle, heroSubtitle, ctaText, aboutText, services, onSave, showToast]);

  useEffect(() => {
    if (!lastSaved) return;
    const timer = setTimeout(() => setLastSaved(null), 3000);
    return () => clearTimeout(timer);
  }, [lastSaved]);

  const addService = () => {
    setServices((prev) => [
      ...prev,
      { title: "", description: "", icon: "✨", price: "", isPopular: false },
    ]);
  };

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof ServiceOffering, value: string | boolean) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Content</h1>
          <p className="text-gray-500 mt-1">Update your page information</p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600">
              <Check className="h-4 w-4" />
              Saved
            </span>
          )}
          <Button onClick={save} isLoading={isSaving} leftIcon={<Save className="h-4 w-4" />}>
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Hero Section</h2>
        <div className="space-y-5">
          <Input
            label="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your business name"
          />
          <Input
            label="Hero Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="Main headline"
          />
          <Input
            label="Hero Subtitle"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            placeholder="A short description"
          />
          <Input
            label="CTA Button Text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            placeholder="Contact Us"
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">About Section</h2>
        <Textarea
          label="About Description"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Tell your story..."
          rows={5}
        />
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Services</h2>
          <Button variant="outline" size="sm" onClick={addService} leftIcon={<Plus className="h-4 w-4" />}>
            Add Service
          </Button>
        </div>
        {services.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Sparkles className="h-8 w-8 mx-auto mb-3" />
            <p className="text-sm">No services added yet. Click "Add Service" to start.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100"
              >
                <div className="mt-2 text-gray-300 cursor-grab">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-3">
                  <Input
                    label="Title"
                    value={service.title}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    placeholder="Service name"
                  />
                  <Input
                    label="Icon (emoji)"
                    value={service.icon}
                    onChange={(e) => updateService(index, "icon", e.target.value)}
                    placeholder="✨"
                    className="text-center"
                  />
                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      value={service.description}
                      onChange={(e) => updateService(index, "description", e.target.value)}
                      placeholder="Describe this service"
                      rows={2}
                    />
                  </div>
                  <Input
                    label="Price (optional)"
                    value={service.price}
                    onChange={(e) => updateService(index, "price", e.target.value)}
                    placeholder="NPR 1,000"
                  />
                  <div className="flex items-end pb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.isPopular}
                        onChange={(e) => updateService(index, "isPopular", e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent/30"
                      />
                      <span className="text-sm text-gray-600">Mark as popular</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => removeService(index)}
                  className="mt-6 p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  aria-label="Remove service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
