"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { AUTH, APP_NAME, LEAFFPRO_WHATSAPP } from "@/lib/constants";
import { MessageCircle, Leaf, Lock, Smartphone } from "lucide-react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_LEAFPRO_WHATSAPP || LEAFFPRO_WHATSAPP;

export default function LoginPage() {
  const { showToast } = useToast();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!data.success) {
        showToast(data.error || "Invalid credentials", "error");
        setIsLoading(false);
        return;
      }

      const token = data.data.token;

      document.cookie = `${AUTH.COOKIE_NAME}=${token}; SameSite=Lax; Path=/; Max-Age=${AUTH.SESSION_DURATION_SECONDS}`;

      const isSuperadmin = data.data.role === "superadmin";
      const target = isSuperadmin
        ? "/dashboard/admin"
        : data.data.resetRequired
        ? "/dashboard/setup"
        : "/dashboard";

      await new Promise((r) => setTimeout(r, 100));

      window.location.href = target;
    } catch {
      showToast("Login failed. Please try again.", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 relative w-14 h-14">
            <Image
              src="/Logo.png"
              alt={APP_NAME}
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-ink tracking-tight font-display">
            Welcome back
          </h1>
          <p className="text-ink-mute mt-1.5 text-sm">
            Sign in to manage your business page
          </p>
        </div>

        {/* Card */}
        <div className="bg-bone/80 rounded border border-paper-dark">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9779812345678"
              required
              autoComplete="tel"
            />
            <Input
              label="Passcode"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your passcode"
              required
              autoComplete="current-password"
            />
            <div className="flex justify-end -mt-2">
              <a
                href="/forgot-password"
                className="text-xs text-coral hover:text-coral/80 font-medium transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-ink-faint">
            Don&apos;t have a page?{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Leafpro, I want to create a website for: My Business")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:text-coral/80 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              Create one on WhatsApp
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-ink-faint">
          <span className="inline-flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5" />
            OTP login
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            Secure
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Leaf className="h-3.5 w-3.5" />
            Leafpro
          </span>
        </div>
      </div>
    </div>
  );
}
