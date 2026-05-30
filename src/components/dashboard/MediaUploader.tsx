"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Upload, Image, X, Trash2 } from "lucide-react";
import type { GalleryAsset } from "@/types/tenant";

interface MediaUploaderProps {
  gallery: GalleryAsset[];
  onRefresh: () => void;
}

export function MediaUploader({ gallery, onRefresh }: MediaUploaderProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const uploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true);
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
        showToast("Image uploaded successfully", "success");
        onRefresh();
      } catch {
        showToast("Upload failed. Please try again.", "error");
      } finally {
        setIsUploading(false);
      }
    },
    [onRefresh, showToast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [uploadFile]
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
      showToast("Image deleted", "success");
      onRefresh();
    } catch {
      showToast("Delete failed. Please try again.", "error");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(assetId);
        return next;
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Media Manager</h1>
        <p className="text-gray-500 mt-1">Upload and manage your images</p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragging
              ? "border-accent bg-accent/5"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleFileSelect}
        />
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center animate-pulse">
              <Upload className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isDragging ? "Drop your image here" : "Drag & drop an image here"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                or click to browse &bull; JPEG, PNG, WebP, AVIF &bull; Max 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((asset) => (
            <div
              key={asset._id}
              className="group relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-100"
            >
              <img
                src={asset.thumbnailUrl || asset.assetUrl}
                alt={asset.assetCaption || "Gallery image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
              <button
                onClick={() => asset._id && handleDelete(asset._id)}
                disabled={deletingIds.has(asset._id!)}
                className="
                  absolute top-2 right-2 p-1.5 rounded-lg
                  bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white
                  opacity-0 group-hover:opacity-100 transition-all duration-200
                  disabled:opacity-50
                "
                aria-label="Delete image"
              >
                {deletingIds.has(asset._id!) ? (
                  <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {gallery.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Image className="h-12 w-12 mx-auto mb-3" />
          <p className="text-sm font-medium">No images yet</p>
          <p className="text-xs mt-1">Upload images to display in your gallery</p>
        </div>
      )}
    </div>
  );
}
