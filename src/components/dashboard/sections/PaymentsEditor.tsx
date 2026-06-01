"use client";

import { useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { ImageIcon, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import type { PaymentQr } from "@/types/tenant";

interface PaymentsEditorProps {
  payments: PaymentQr[];
  onChange: (payments: PaymentQr[]) => void;
}

export function PaymentsEditor({ payments, onChange }: PaymentsEditorProps) {
  const { showToast } = useToast();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const paymentsRef = useRef(payments);
  paymentsRef.current = payments;

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
        const newQr: PaymentQr = {
          imageUrl: result.data.assetUrl,
          label: "",
          order: Date.now(),
        };
        if (result.data.assetId) newQr._id = result.data.assetId;
        onChange([...paymentsRef.current, newQr]);
        showToast("QR code added", "success");
      } catch {
        showToast("Upload failed", "error");
      } finally {
        setUploading(false);
      }
    },
    [onChange, showToast]
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
      onChange(paymentsRef.current.filter((p) => p._id !== assetId));
      showToast("QR code removed", "success");
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

  const updateLabel = (index: number, label: string) =>
    onChange(
      payments.map((p, i) => (i === index ? { ...p, label } : p))
    );

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        id="payments-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => document.getElementById("payments-upload")?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border-2 border-dashed border-paper-dark hover:border-coral/50 hover:bg-bone/50 transition-all text-sm text-ink-mute hover:text-ink"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
        {uploading ? "Uploading..." : "Upload QR Code"}
      </button>

      {payments.length === 0 ? (
        <div className="text-center py-6 text-ink-faint">
          <ImageIcon className="h-6 w-6 mx-auto mb-2" />
          <p className="text-sm">No payment QR codes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {payments.map((qr, index) => (
            <div
              key={qr._id || index}
              className="rounded border border-paper-dark overflow-hidden bg-bone group relative"
            >
              <div className="aspect-square overflow-hidden bg-paper-dark relative">
                <img
                  src={qr.imageUrl}
                  alt={qr.label || "Payment QR"}
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute top-1.5 right-1.5">
                  <button
                    onClick={() => qr._id && handleDelete(qr._id)}
                    disabled={deletingIds.has(qr._id!)}
                    className="p-1.5 rounded bg-white/90 hover:bg-red-500 hover:text-white text-red-500 transition-all shadow-sm"
                    aria-label="Delete QR code"
                  >
                    {deletingIds.has(qr._id!) ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-2">
                <Input
                  value={qr.label}
                  onChange={(e) => updateLabel(index, e.target.value)}
                  placeholder="e.g. eSewa, Khalti"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
