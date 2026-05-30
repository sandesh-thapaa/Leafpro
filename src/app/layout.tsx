import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Leafpro — Your Business, Online in Seconds",
    template: "%s | Leafpro",
  },
  description:
    "Create a premium landing page for your business via WhatsApp. No code, no hassle.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <ToastProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
