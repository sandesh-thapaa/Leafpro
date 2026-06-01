"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/Input";
import { ImageIcon, Trash2, Loader2, RotateCcw } from "lucide-react";
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
  const [replacingId, setReplacingId] = useState<string | null>(null);

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
        const result = await res.json();
        if (!result.success) {
          showToast(result.error || "Upload failed", "error");
          return;
        }
        const newAsset: GalleryAsset = {
          assetUrl: result.data.assetUrl,
          thumbnailUrl: result.data.thumbnailUrl,
          assetCaption: "",
          assetOrder: Date.now(),
          uploadedAt: new Date().toISOString(),
        };
        if (result.data.assetId) newAsset._id = result.data.assetId;
        onChange([...assets, newAsset]);
        showToast("Image added to gallery", "success");
        onRefresh();
      } catch {
        showToast("Upload failed", "error");
      } finally {
        setUploading(false);
      }
    },
    [assets, onChange, onRefresh, showToast]
  );

  const handleReplace = async (oldAssetId: string, file: File) => {
    setReplacingId(oldAssetId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/v1/dashboard/media", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!result.success) {
        showToast(result.error || "Upload failed", "error");
        return;
      }
      const delRes = await fetch(`/api/v1/dashboard/media/${oldAssetId}`, {
        method: "DELETE",
      });
      const delData = await delRes.json();
      if (!delData.success) {
        showToast("New image uploaded but old one could not be removed", "warning");
      }
      const replacedAsset: GalleryAsset = {
        assetUrl: result.data.assetUrl,
        thumbnailUrl: result.data.thumbnailUrl,
        assetCaption: "",
        assetOrder: Date.now(),
        uploadedAt: new Date().toISOString(),
      };
      if (result.data.assetId) replacedAsset._id = result.data.assetId;
      onChange(assets.map((a) => (a._id === oldAssetId ? replacedAsset : a)));
      showToast("Image replaced", "success");
      onRefresh();
    } catch {
      showToast("Replace failed", "error");
    } finally {
      setReplacingId(null);
    }
  };

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
      onChange(assets.filter((a) => a._id !== assetId));
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

  const triggerReplace = (assetId: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/avif";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && assetId) handleReplace(assetId, file);
    };
    input.click();
  };

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
              <div className="aspect-video overflow-hidden bg-paper-dark relative">
                <img
                  src={asset.thumbnailUrl || asset.assetUrl}
                  alt={asset.assetCaption || ""}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 max-lg:bg-black/20" />
                <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => asset._id && triggerReplace(asset._id)}
                    disabled={replacingId === asset._id}
                    className="p-1.5 rounded bg-white/90 hover:bg-blue-500 hover:text-white text-blue-500 transition-all"
                    aria-label="Replace image"
                  >
                    {replacingId === asset._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => asset._id && handleDelete(asset._id)}
                    disabled={deletingIds.has(asset._id!)}
                    className="p-1.5 rounded bg-white/90 hover:bg-red-500 hover:text-white text-red-500 transition-all"
                    aria-label="Delete image"
                  >
                    {deletingIds.has(asset._id!) ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
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
