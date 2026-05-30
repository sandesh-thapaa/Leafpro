"use client";

import { useState, useEffect } from "react";
import { MediaUploader } from "@/components/dashboard/MediaUploader";
import { PageSpinner } from "@/components/ui/Spinner";
import type { TenantData } from "@/types/tenant";

export default function MediaPage() {
  const [gallery, setGallery] = useState<TenantData["galleryAssets"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/v1/dashboard/profile");
      const data = await res.json();
      if (data.success) {
        setGallery(data.data.galleryAssets ?? []);
      }
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (isLoading) return <PageSpinner />;

  return <MediaUploader gallery={gallery} onRefresh={fetchGallery} />;
}
