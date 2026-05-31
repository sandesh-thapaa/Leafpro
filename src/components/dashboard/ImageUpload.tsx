"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const uploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      setIsUploading(true);
      try {
        const res = await fetch("/api/v1/dashboard/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!data.success) {
          showToast(data.error || "Upload failed", "error");
          return;
        }
        onChange(data.data.assetUrl);
        showToast("Image uploaded", "success");
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch {
        showToast("Upload failed", "error");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, showToast]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    },
    []
  );

  const handleConfirmUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  const handleCancelPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleRemove = () => onChange("");

  const getFileInput = () => (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/jpeg,image/png,image/webp,image/avif"
      className="hidden"
      onChange={handleFileSelect}
    />
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-ink mb-2">{label}</label>
      )}

      {value && !previewUrl ? (
        <div className="relative rounded border border-paper-dark overflow-hidden bg-bone group">
          <img src={value} alt="Upload preview" className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 rounded bg-white/90 hover:bg-white text-ink transition-all" title="Replace image"><Upload className="h-4 w-4" /></button>
            <button type="button" onClick={handleRemove} className="p-2 rounded bg-white/90 hover:bg-red-500 hover:text-white text-red-500 transition-all" title="Remove image"><X className="h-4 w-4" /></button>
          </div>
        </div>
      ) : previewUrl ? (
        <div className="space-y-3">
          <div className="relative rounded border border-paper-dark overflow-hidden bg-bone">
            <img src={previewUrl} alt="Preview" className="w-full aspect-video object-cover" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConfirmUpload}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              onClick={handleCancelPreview}
              disabled={isUploading}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging ? "border-coral bg-coral/5" : "border-gray-300 bg-white hover:border-coral/50 hover:bg-coral/5"
          }`}
        >
          {getFileInput()}
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 text-coral animate-spin" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">{isDragging ? "Drop image here" : "Click or drag to upload"}</p>
              <p className="text-xs text-gray-400">JPEG, PNG, WebP &bull; Max 10MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
