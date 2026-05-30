"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/v1/dashboard/profile");
        if (cancelled) return;
        if (res.status === 401) {
          router.replace("/dashboard/login");
          return;
        }
        const json = await res.json();
        if (cancelled) return;
        if (json.success) {
          setData(json.data);
        } else {
          setError(res.status === 404 ? "Business profile not found" : json.error || "Failed to load");
        }
      } catch {
        if (!cancelled) setError("Connection error");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchProfile();
    return () => { cancelled = true; };
  }, [router]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-56 bg-paper-dark rounded" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-paper-dark rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <div className="w-12 h-12 mx-auto mb-4 rounded bg-coral/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        </div>
        <p className="text-ink-mute mb-3">{error}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-coral hover:underline">
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24">
        <p className="text-ink-mute">No data available.</p>
      </div>
    );
  }

  const accent = data.accentColorHex || "#ed6f5c";
  const sections = data.sections || [];
  const sectionSummary = sections.length > 0
    ? sections
        .filter((s: any) => s.enabled && s.sectionType)
        .map((s: any) => s.sectionType)
    : ["hero", "about", "services", "gallery", "contact"];

  const stats = [
    {
      label: "Page Views",
      value: data.pageViewCount ?? 0,
      color: "bg-coral/10 text-coral",
    },
    {
      label: "Gallery Images",
      value: data.galleryAssets?.length ?? 0,
      color: "bg-mustard/10 text-mustard",
    },
    {
      label: "Services",
      value: data.services?.length ?? 0,
      color: "bg-olive/10 text-olive",
    },
    {
      label: "Products",
      value: data.products?.length ?? 0,
      color: "bg-coral/10 text-coral",
    },
    {
      label: "Sections Live",
      value: sectionSummary.length,
      color: "bg-mustard/10 text-mustard",
    },
  ];

  const quickActions = [
    {
      label: "Page Builder",
      href: "/dashboard/edit",
      desc: "Edit sections & content",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      desc: "Branding & links",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink font-display tracking-tight">
            Welcome back{data.name ? `, ${data.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-ink-mute text-sm mt-1">
            Here&apos;s your page at a glance
          </p>
        </div>
        <a
          href={`/${data.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium border border-paper-dark text-ink-mute hover:text-ink hover:bg-paper-dark transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          View Page
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-bone/80 border border-paper-dark rounded p-4">
            <p className="text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-mute mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {quickActions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="block bg-bone/80 border border-paper-dark rounded p-5 hover:bg-paper-dark/30 transition-all group"
          >
            <p className="font-semibold text-ink group-hover:text-coral transition-colors">{a.label}</p>
            <p className="text-sm text-ink-mute mt-0.5">{a.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-bone/80 border border-paper-dark rounded p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-ink font-display tracking-tight">
            Live Sections
          </h2>
          <span className="text-xs font-mono text-ink-faint">{sectionSummary.length} active</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sectionSummary.map((type: string) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
              style={{ backgroundColor: `${accent}12`, color: accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-paper-dark rounded divide-y divide-paper-dark">
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-ink-mute">Status</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${
            data.accountStatus === "active" ? "bg-olive/10 text-olive" : "bg-mustard/10 text-mustard"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              data.accountStatus === "active" ? "bg-olive" : "bg-mustard"
            }`} />
            {data.accountStatus}
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-ink-mute">Page URL</span>
          <a href={`/${data.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: accent }}>
            /{data.slug}
          </a>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-ink-mute">Phone</span>
          <span className="text-sm text-ink">{data.contactPhone || "—"}</span>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-ink-mute">Created</span>
          <span className="text-sm text-ink">
            {new Date(data.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-ink-mute">WhatsApp</span>
          <span className={`text-sm font-medium ${data.routingEndpoints?.whatsappActiveNumber ? "text-ink" : "text-ink-faint"}`}>
            {data.routingEndpoints?.whatsappActiveNumber ? "Connected" : "Not set"}
          </span>
        </div>
      </div>
    </div>
  );
}
