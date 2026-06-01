"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { HeroEditor } from "./sections/HeroEditor";
import { AboutEditor } from "./sections/AboutEditor";
import { ServicesEditor } from "./sections/ServicesEditor";
import { GalleryEditor } from "./sections/GalleryEditor";
import { ProductsEditor } from "./sections/ProductsEditor";
import { PaymentsEditor } from "./sections/PaymentsEditor";
import { ContactEditor } from "./sections/ContactEditor";
import { TextEditor } from "./sections/TextEditor";
import {
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import type {
  TenantData,
  PageSectionConfig,
  SectionType,
} from "@/types/tenant";
import { SECTION_LABELS, SECTION_LAYOUTS } from "@/types/tenant";
import { Modal } from "@/components/ui/Modal";

function getDefaultSections(data: TenantData): PageSectionConfig[] {
  const sections: PageSectionConfig[] = [];
  let order = 0;

  sections.push({
    sectionType: "hero",
    enabled: true,
    order: order++,
    layout: data.heroBlock.bannerImageUrl ? "split-right" : "centered",
  });

  sections.push({
    sectionType: "about",
    enabled: !!data.aboutDescription,
    order: order++,
    layout: data.aboutImageUrl ? "image-right" : "text-only",
  });

  if (data.services && data.services.length > 0) {
    sections.push({
      sectionType: "services",
      enabled: true,
      order: order++,
      layout: "grid",
    });
  }

  if (data.products && data.products.length > 0) {
    sections.push({
      sectionType: "products",
      enabled: true,
      order: order++,
      layout: "grid",
    });
  }

  if (data.payments && data.payments.length > 0) {
    sections.push({
      sectionType: "payments",
      enabled: true,
      order: order++,
      layout: "grid",
    });
  }

  if (data.galleryAssets && data.galleryAssets.length > 0) {
    sections.push({
      sectionType: "gallery",
      enabled: true,
      order: order++,
      layout: "grid-3",
    });
  }

  if (data.customTexts && data.customTexts.length > 0) {
    sections.push({
      sectionType: "text",
      enabled: true,
      order: order++,
      layout: "default",
    });
  }

  sections.push({
    sectionType: "contact",
    enabled: true,
    order: order++,
    layout: "cards",
  });

  return sections;
}

interface PageBuilderProps {
  tenant: TenantData;
  onSave?: () => void;
}

export function PageBuilder({ tenant, onSave }: PageBuilderProps) {
  const { showToast } = useToast();

  const [data, setData] = useState<TenantData>(() => ({
    ...tenant,
    aboutImageUrl: (tenant as any).aboutImageUrl ?? "",
    payments: (tenant as any).payments ?? [],
  }));
  const [sections, setSections] = useState<PageSectionConfig[]>(() => {
    if (tenant.sections && tenant.sections.length > 0) {
      return tenant.sections
        .filter((s) => s.sectionType)
        .sort((a, b) => a.order - b.order);
    }
    return getDefaultSections(tenant);
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; label: string } | null>(null);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      name: tenant.name,
      aboutDescription: tenant.aboutDescription,
      aboutImageUrl: tenant.aboutImageUrl ?? "",
      services: tenant.services,
      products: tenant.products,
      payments: tenant.payments ?? [],
      galleryAssets: tenant.galleryAssets,
      customTexts: tenant.customTexts,
      heroBlock: tenant.heroBlock,
      routingEndpoints: tenant.routingEndpoints,
    }));
    if (tenant.sections && tenant.sections.length > 0) {
      setSections(
        tenant.sections
          .filter((s) => s.sectionType)
          .sort((a, b) => a.order - b.order)
      );
    }
  }, [tenant]);

  const currentSections = sections.filter((s) => s.sectionType);

  const fieldChange = useCallback(
    (field: string, value: string) => {
      if (field.startsWith("heroBlock.")) {
        const key = field.split(".")[1];
        setData((prev) => ({
          ...prev,
          heroBlock: { ...prev.heroBlock, [key]: value },
        }));
      } else if (field.startsWith("routingEndpoints.")) {
        const key = field.split(".")[1];
        setData((prev) => ({
          ...prev,
          routingEndpoints: { ...prev.routingEndpoints, [key]: value },
        }));
      } else {
        setData((prev) => ({ ...prev, [field]: value }));
      }
    },
    []
  );

  const updateSection = (
    id: string,
    updates: Partial<PageSectionConfig>
  ) => {
    setSections((prev) =>
      prev.map((s) =>
        (s._id || s.sectionType + s.order) === id
          ? { ...s, ...updates }
          : s
      )
    );
  };

  const hideSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) =>
        (s._id || s.sectionType + s.order) === id
          ? { ...s, enabled: false }
          : s
      )
    );
  };

  const unhideSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) =>
        (s._id || s.sectionType + s.order) === id
          ? { ...s, enabled: true }
          : s
      )
    );
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    const { id } = deleteConfirm;

    const section = sections.find(
      (s) => (s._id || s.sectionType + s.order) === id
    );

    setSections((prev) => {
      const filtered = prev.filter(
        (s) => (s._id || s.sectionType + s.order) !== id
      );
      return filtered.map((s, i) => ({ ...s, order: i }));
    });

    if (section) {
      const type = section.sectionType;
      if (type === "services") {
        setData((prev) => ({ ...prev, services: [] }));
      } else if (type === "products") {
        setData((prev) => ({ ...prev, products: [] }));
      } else if (type === "payments") {
        setData((prev) => ({ ...prev, payments: [] }));
      } else if (type === "gallery") {
        setData((prev) => ({ ...prev, galleryAssets: [] }));
      } else if (type === "text") {
        const textSections = sections.filter((s) => s.sectionType === "text");
        const textIndex = textSections.findIndex(
          (s) => (s._id || s.sectionType + s.order) === id
        );
        if (textIndex >= 0) {
          setData((prev) => ({
            ...prev,
            customTexts: prev.customTexts.filter((_, i) => i !== textIndex),
          }));
        }
      } else if (type === "about") {
        setData((prev) => ({
          ...prev,
          aboutDescription: "",
          aboutImageUrl: "",
        }));
      }
    }

    setDeleteConfirm(null);
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    setSections((prev) => {
      const idx = prev.findIndex(
        (s) => (s._id || s.sectionType + s.order) === id
      );
      if (idx === -1) return prev;
      const target = direction === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr.map((s, i) => ({ ...s, order: i }));
    });
  };

  const addSection = (type: SectionType) => {
    const maxOrder = sections.reduce((m, s) => Math.max(m, s.order), -1);
    const newSection: PageSectionConfig = {
      sectionType: type,
      enabled: true,
      order: maxOrder + 1,
      layout:
        type === "hero"
          ? data.heroBlock.bannerImageUrl
            ? "split-right"
            : "centered"
          : type === "about"
          ? data.aboutImageUrl
            ? "image-right"
            : "text-only"
          : SECTION_LAYOUTS[type]?.[0]?.value ?? "default",
    };
    setSections((prev) => [...prev, newSection]);
    const id = newSection.sectionType + newSection.order;
    setExpandedId(id);
  };

  const isAddable = (type: SectionType): boolean => {
    if (type === "text") return true;
    return !sections.some((s) => s.sectionType === type);
  };

  const save = async () => {
    setIsSaving(true);
    try {
      const body: Record<string, unknown> = {
        name: data.name,
        heroBlock: {
          mainTitle: data.heroBlock.mainTitle,
          subHeadline: data.heroBlock.subHeadline,
          bannerImageUrl: data.heroBlock.bannerImageUrl,
          ctaText: data.heroBlock.ctaText,
        },
        aboutDescription: data.aboutDescription,
        aboutImageUrl: data.aboutImageUrl,
        services: data.services,
        products: data.products,
        payments: data.payments,
        galleryAssets: data.galleryAssets,
        customTexts: data.customTexts,
        routingEndpoints: data.routingEndpoints,
        sections: sections.map((s) => ({
          _id: s._id,
          sectionType: s.sectionType,
          enabled: s.enabled,
          order: s.order,
          layout: s.layout,
        })),
      };

      const res = await fetch("/api/v1/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!result.success) {
        showToast(result.error || "Failed to save", "error");
        return;
      }
      showToast("Page saved!", "success");
      onSave?.();
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const pageUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${data.slug}`;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink tracking-tight font-display">
            Page Builder
          </h1>
          <p className="text-ink-mute mt-1 text-sm">
            Arrange and edit sections of your page
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-ink-mute hover:text-ink bg-bone border border-paper-dark transition-all"
          >
            <Eye className="h-4 w-4" />
            View Page
          </a>
          <Button onClick={save} isLoading={isSaving}>
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {currentSections.map((section) => {
          const id = section._id || section.sectionType + section.order;
          const isExpanded = expandedId === id;
          const layouts = SECTION_LAYOUTS[section.sectionType] || [];
          const label = SECTION_LABELS[section.sectionType] || section.sectionType;

          return (
            <div
              key={id}
              className="bg-bone/80 border border-paper-dark rounded overflow-hidden transition-all"
            >
              <div className="flex flex-wrap items-center gap-2 px-4 py-3">
                <div className="text-ink-faint cursor-grab">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={`text-sm font-medium truncate ${section.enabled ? "text-ink" : "text-ink-faint line-through"}`}>
                    {label}
                  </span>
                  {!section.enabled && (
                    <span className="text-xs text-amber-500 font-medium shrink-0">Hidden</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSection(id, "up")}
                    className="p-1 rounded text-ink-faint hover:text-ink hover:bg-paper-dark transition-all"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveSection(id, "down")}
                    className="p-1 rounded text-ink-faint hover:text-ink hover:bg-paper-dark transition-all"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {layouts.length > 0 && (
                  <select
                    value={section.layout}
                    onChange={(e) =>
                      updateSection(id, { layout: e.target.value })
                    }
                    className="text-xs bg-paper border border-paper-dark rounded px-2 py-1 text-ink-mute focus:outline-none focus:border-coral w-full sm:w-auto"
                  >
                    {layouts.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                )}

                <div className="flex items-center gap-1">
                  {/* Hide/Unhide button */}
                  {section.enabled ? (
                    <button
                      onClick={() => hideSection(id)}
                      className="p-1.5 rounded text-ink-faint hover:text-amber-500 hover:bg-amber-50 transition-all"
                      aria-label="Hide section"
                      title="Hide from page"
                    >
                      <EyeOff className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => unhideSection(id)}
                      className="p-1.5 rounded text-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
                      aria-label="Unhide section"
                      title="Show on page"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}

                  {/* Delete button — not available for hero and contact */}
                  {section.sectionType !== "hero" && section.sectionType !== "contact" && (
                    <button
                      onClick={() => {
                        const label = SECTION_LABELS[section.sectionType] || section.sectionType;
                        setDeleteConfirm({ id, label });
                      }}
                      className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      aria-label="Delete section"
                      title="Permanently delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : id)
                    }
                    className="text-xs font-medium text-coral hover:text-coral/80 shrink-0 ml-1"
                  >
                    {isExpanded ? "Close" : "Edit"}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-paper-dark px-4 py-4">
                  {section.sectionType === "hero" && (
                    <HeroEditor data={data} onChange={fieldChange} />
                  )}
                  {section.sectionType === "about" && (
                    <AboutEditor data={data} onChange={fieldChange} />
                  )}
                  {section.sectionType === "services" && (
                    <ServicesEditor
                      services={data.services}
                      onChange={(svcs) =>
                        setData((prev) => ({ ...prev, services: svcs }))
                      }
                    />
                  )}
                  {section.sectionType === "gallery" && (
                    <GalleryEditor
                      assets={data.galleryAssets}
                      onChange={(assets) =>
                        setData((prev) => ({ ...prev, galleryAssets: assets }))
                      }
                      onRefresh={onSave || (() => {})}
                    />
                  )}
                  {section.sectionType === "products" && (
                    <ProductsEditor
                      products={data.products}
                      onChange={(prods) =>
                        setData((prev) => ({ ...prev, products: prods }))
                      }
                    />
                  )}
                  {section.sectionType === "payments" && (
                    <PaymentsEditor
                      payments={data.payments}
                      onChange={(p) =>
                        setData((prev) => ({ ...prev, payments: p }))
                      }
                    />
                  )}
                  {section.sectionType === "contact" && (
                    <ContactEditor data={data} onChange={fieldChange} />
                  )}
                  {section.sectionType === "text" && (
                    <TextEditor
                      texts={data.customTexts}
                      onChange={(txts) =>
                        setData((prev) => ({ ...prev, customTexts: txts }))
                      }
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <p className="text-xs font-mono tracking-wider text-ink-faint mb-3">
          ADD SECTION
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              "hero",
              "about",
              "services",
              "products",
              "payments",
              "gallery",
              "text",
              "contact",
            ] as SectionType[]
          ).map((type) => {
            const addable = isAddable(type);
            return (
              <button
                key={type}
                onClick={() => addable && addSection(type)}
                disabled={!addable}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  addable
                    ? "bg-bone border border-paper-dark text-ink-mute hover:text-ink hover:bg-paper-dark"
                    : "bg-paper-dark/50 text-ink-faint/50 cursor-not-allowed line-through"
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
                {SECTION_LABELS[type]}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-ink-faint mt-2">
          Each section type can only be added once, except Text Block which can be added multiple times.
        </p>
      </div>

      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title={`Delete "${deleteConfirm?.label || ""}" Section?`}
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-gray-600 mb-6">
          All content in this section will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={executeDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
