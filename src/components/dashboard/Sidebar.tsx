"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileEdit,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  businessName?: string;
  slug?: string;
  role?: string;
}

export function Sidebar({ businessName, slug, role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isSuperadmin = role === "superadmin";

  const navItems = isSuperadmin
    ? [
        {
          href: "/dashboard/admin",
          label: "Admin Panel",
          icon: LayoutDashboard,
        },
      ]
    : [
        { href: "/dashboard", label: "Home", icon: LayoutDashboard },
        { href: "/dashboard/edit", label: "Page Builder", icon: FileEdit },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
      ];

  const handleLogout = async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-3 left-3 z-50 lg:hidden p-2 rounded bg-paper border border-paper-dark hover:bg-paper-dark transition-all"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? (
          <X className="h-4.5 w-4.5 text-ink" />
        ) : (
          <Menu className="h-4.5 w-4.5 text-ink" />
        )}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-paper border-r border-paper-dark flex flex-col transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-5 pt-5 pb-4 border-b border-paper-dark">
          <Link
            href={isSuperadmin ? "/dashboard/admin" : "/dashboard"}
            className="flex items-center gap-3"
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/Logo.png"
                alt="Leafpro"
                fill
                className="object-contain rounded"
              />
            </div>
            <div>
              <span className="text-sm font-semibold text-ink">Leafpro</span>
              <p className="text-[11px] font-mono tracking-wider text-ink-faint">
                {businessName || slug || "Dashboard"}
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto min-h-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-coral/10 text-coral"
                    : "text-ink-mute hover:text-ink hover:bg-paper-dark"
                }`}
              >
                <item.icon
                  className={`h-4.5 w-4.5 shrink-0 ${
                    isActive ? "" : "text-ink-faint"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-paper-dark space-y-0.5">
          {slug && !isSuperadmin && (
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-ink-mute hover:text-ink hover:bg-paper-dark transition-all duration-200 w-full"
            >
              <ExternalLink className="h-4.5 w-4.5 shrink-0 text-ink-faint" />
              View Page
            </a>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-coral hover:bg-coral/10 transition-all duration-200 w-full"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
