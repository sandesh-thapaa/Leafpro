"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageBuilder } from "@/components/dashboard/PageBuilder";
import { PageSpinner } from "@/components/ui/Spinner";
import type { TenantData } from "@/types/tenant";

export default function EditPage() {
  const router = useRouter();
  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/v1/dashboard/profile");
      const data = await res.json();
      if (data.success) {
        if (data.data.role === "superadmin") {
          router.replace("/dashboard/admin");
          return;
        }
        setTenant(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [router]);

  if (isLoading) return <PageSpinner />;
  if (!tenant)
    return (
      <p className="text-ink-mute text-center py-20">
        Failed to load data.
      </p>
    );

  return <PageBuilder tenant={tenant} onSave={fetchProfile} />;
}
