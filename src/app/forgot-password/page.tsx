"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Something went wrong", "error");
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-ink tracking-tight font-display mb-2">
            Request Submitted
          </h1>
          <p className="text-ink-mute text-sm mb-6">
            If your phone number is registered, the admin will review your request and generate a new password. Contact your admin for the new password.
          </p>
          <a
            href="/dashboard/login"
            className="inline-flex items-center gap-2 text-coral hover:text-coral/80 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink tracking-tight font-display">
            Forgot Password
          </h1>
          <p className="text-ink-mute mt-1.5 text-sm">
            Enter your registered phone number. Admin will review your request.
          </p>
        </div>

        <div className="bg-bone/80 rounded border border-paper-dark">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9779812345678"
              required
            />
            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Submit Request
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/dashboard/login"
            className="inline-flex items-center gap-1.5 text-sm text-coral hover:text-coral/80 font-medium transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
