"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/Input";
import { ImageIcon, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import type { GalleryAsset } from "@/types/tenant";

interface GalleryEditorProps {
  assets: GalleryAsset[];
  onChange: (assets: GalleryAsset[]) => void;
  onRefresh: () => void;
}

export function GalleryEditor({ assets, onChange, onRefresh }: GalleryEditorProps) {
  const { showToast } = useToast();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      try {
        const res = await fetch("/api/v1/dashboard/media", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!data.success) {
          showToast(data.error || "Upload failed", "error");
          return;
        }
        showToast("Image added to gallery", "success");
        onRefresh();
      } catch {
        showToast("Upload failed", "error");
      } finally {
        setUploading(false);
      }
    },
    [onRefresh, showToast]
  );

  const handleDelete = async (assetId: string) => {
    setDeletingIds((prev) => new Set(prev).add(assetId));
    try {
      const res = await fetch(`/api/v1/dashboard/media/${assetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Delete failed", "error");
        return;
      }
      showToast("Image removed", "success");
      onRefresh();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(assetId);
        return next;
      });
    }
  };

  const updateCaption = (index: number, caption: string) =>
    onChange(
      assets.map((a, i) => (i === index ? { ...a, assetCaption: caption } : a))
    );

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        id="gallery-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => document.getElementById("gallery-upload")?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border-2 border-dashed border-paper-dark hover:border-coral/50 hover:bg-bone/50 transition-all text-sm text-ink-mute hover:text-ink"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
        {uploading ? "Uploading..." : "Upload Image to Gallery"}
      </button>

      {assets.length === 0 ? (
        <div className="text-center py-6 text-ink-faint">
          <ImageIcon className="h-6 w-6 mx-auto mb-2" />
          <p className="text-sm">No gallery images yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {assets.map((asset, index) => (
            <div
              key={asset._id || index}
              className="rounded border border-paper-dark overflow-hidden bg-bone group relative"
            >
              <div className="aspect-video overflow-hidden bg-paper-dark">
                <img
                  src={asset.thumbnailUrl || asset.assetUrl}
                  alt={asset.assetCaption || ""}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => asset._id && handleDelete(asset._id)}
                  disabled={deletingIds.has(asset._id!)}
                  className="absolute top-1.5 right-1.5 p-1.5 rounded bg-white/90 hover:bg-red-500 hover:text-white text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Delete"
                >
                  {deletingIds.has(asset._id!) ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <div className="p-2">
                <Input
                  value={asset.assetCaption}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  placeholder="Add caption"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
