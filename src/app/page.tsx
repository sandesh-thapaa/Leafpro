"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import { APP_NAME, LEAFFPRO_WHATSAPP, AUTH } from "@/lib/constants";
import { CustomerShowcase } from "@/components/public/CustomerShowcase";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_LEAFPRO_WHATSAPP || LEAFFPRO_WHATSAPP;
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Leafpro, I want to create a website for: My Business")}`;

const COORDS = "27.7172° N · 85.3240° E";

const faqs = [
  {
    q: "What is Leafpro?",
    a: "Leafpro is a landing page platform for Nepali businesses. You text your business name on WhatsApp and receive a live, customizable page in seconds — no signup forms, no technical skills required.",
  },
  {
    q: "Is Leafpro free?",
    a: "Yes. Creating a page is completely free. No credit card required, no hidden charges. Premium features may follow.",
  },
  {
    q: "How fast is the setup?",
    a: "Under 30 seconds. Send a WhatsApp message with your business name and you will receive your unique URL and dashboard credentials almost instantly.",
  },
  {
    q: "Can I customize my page?",
    a: "Yes. Log into your dashboard to update content, change colors, upload photos, manage your media gallery, and customize your contact links.",
  },
  {
    q: "Do I need a phone number?",
    a: "Yes. Your WhatsApp number is your identity on Leafpro. You log in using your phone number and a password set during onboarding.",
  },
];

const steps = [
  {
    n: "001",
    title: "Text on WhatsApp",
    desc: 'Send "I want to create a website for: Your Business Name" to our WhatsApp number.',
  },
  {
    n: "002",
    title: "Get Your Page",
    desc: "Receive your unique URL and dashboard credentials within seconds. Your page is live instantly.",
  },
  {
    n: "003",
    title: "Customize & Share",
    desc: "Log into your dashboard to update content, upload photos, and share your page with customers.",
  },
];

const features = [
  {
    title: "Instant Setup",
    desc: "Text your business name on WhatsApp and get a live page in seconds. No forms, no signup flow.",
  },
  {
    title: "Self-Service Dashboard",
    desc: "Full control over your content, colors, and links — no technical skills needed.",
  },
  {
    title: "Premium Design",
    desc: "Modern, conversion-optimized layouts with smooth animations.",
  },
  {
    title: "Media Manager",
    desc: "Upload and organize photos with automatic optimization and CDN delivery.",
  },
  {
    title: "QR & Share",
    desc: "Built-in QR code generator and WhatsApp sharing for customers.",
  },
  {
    title: "Nepal-First",
    desc: "Built for Nepali businesses with local phone validation and WhatsApp integration.",
  },
];

const testimonials = [
  {
    text: "I got my page in 10 seconds. The design is better than what I paid NPR 20,000 for before.",
    author: "Maya Shakya",
    role: "Café Owner, Kathmandu",
  },
  {
    text: "My students can now find course info and message me directly. So simple.",
    author: "Rajan Poudel",
    role: "Institute Director, Pokhara",
  },
  {
    text: "My salon portfolio looks amazing on this platform. My bookings went up!",
    author: "Sunita Gurung",
    role: "Salon Owner, Biratnagar",
  },
];

const flow = [
  { n: "01", title: "Receive", desc: "Our WhatsApp bot receives your business name and phone number." },
  { n: "02", title: "Create", desc: "A tenant record is created with your business name and a unique slug." },
  { n: "03", title: "Provision", desc: "Dashboard credentials are generated and your page is deployed." },
  { n: "04", title: "Notify", desc: "You receive your URL and login credentials via WhatsApp." },
];

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-paper-dark py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 group"
      >
        <span className="text-base font-medium text-ink group-hover:text-brand transition-colors">
          {question}
        </span>
        {open ? (
          <Minus className="h-3.5 w-3.5 text-ink-faint shrink-0" />
        ) : (
          <Plus className="h-3.5 w-3.5 text-ink-faint shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-3" : "max-h-0"
        }`}
      >
        <p className="text-base text-ink-mute leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-brand/8 blur-[140px]" />
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-brand/5 blur-[140px]" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-mustard/5 blur-[120px]" />
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${AUTH.COOKIE_NAME}=`));
    setAuthenticated(!!hasToken);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -60px 0px" }
      );
      const elements = document.querySelectorAll(
        "[data-reveal]:not([data-revealed])"
      );
      for (const el of elements) observer.observe(el);
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased font-sans">
      {/* ───── NAV ───── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-paper-dark"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/Logo.png"
                alt={APP_NAME}
                className="h-10 w-auto rounded-md"
              />
              <span className="text-lg font-bold tracking-tight text-ink">
                {APP_NAME}
              </span>
            </a>
            <div className="flex items-center gap-8">
              <a
                href={authenticated ? "/dashboard" : "/dashboard/login"}
                className="text-sm tracking-wider font-medium text-ink-faint hover:text-ink transition-colors"
              >
                {authenticated ? "Dashboard" : "Sign In"}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold tracking-wider bg-brand-dark text-white hover:bg-brand-dark/90 transition-all duration-200 active:scale-[0.97]"
              >
                Create Page
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ───── HERO ───── */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 border-b border-paper-dark pointer-events-none" />
          <div className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-12 lg:gap-16">
                {/* Left: Text */}
                <div className="flex-1 max-w-xl shrink-0" data-reveal>
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-ink-faint mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span>LEAFPRO &mdash; VOL. 01 / ISSUE N&ordm; 01</span>
                  </div>

                  <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-ink leading-[1.04] mb-5 font-display">
                    Your business, online{" "}
                    <span className="text-brand">in seconds</span>
                  </h1>

                  <p className="text-base text-ink-mute max-w-md leading-relaxed mb-9">
                    The instant landing page platform for Nepali businesses. Text your
                    business name on WhatsApp and your page goes live before you
                    finish reading this sentence.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-brand text-bone text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Start on WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/dashboard/login"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-paper-dark text-ink-mute text-sm font-medium transition-all duration-200 hover:bg-paper-warm hover:text-ink"
                    >
                      Sign In
                    </a>
                  </div>

                  <div className="flex items-center gap-6 mt-12 text-xs font-mono tracking-wider text-ink-faint">
                    <span>Instant &middot; No code &middot; Free</span>
                    <span className="hidden sm:inline">{COORDS}</span>
                  </div>
                </div>

                {/* Right: Preview Visual */}
                <div className="hidden lg:block flex-1 min-w-0" data-reveal="right">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-brand/8 blur-[80px] rounded-full" />
                    <div className="relative rounded-xl overflow-hidden border border-paper-dark shadow-xl shadow-black/5">
                      <div className="bg-gradient-to-br from-paper-warm via-paper to-paper-warm p-0.5">
                        <div className="bg-bone rounded-lg overflow-hidden">
                          {/* Browser bar */}
                          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-paper-dark">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-mustard/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-olive/60" />
                            <div className="flex-1 flex justify-center">
                              <div className="text-[10px] font-mono text-ink-faint/50 tracking-wider truncate max-w-[200px]">
                                mybusiness.leafpro.com.np
                              </div>
                            </div>
                          </div>
                          {/* Preview content */}
                          <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 rounded-full bg-paper-dark" />
                              <div>
                                <div className="h-3 w-28 rounded bg-paper-dark mb-1.5" />
                                <div className="h-2 w-20 rounded bg-paper-warm" />
                              </div>
                            </div>
                            <div className="h-5 w-3/4 rounded bg-paper-dark mb-4" />
                            <div className="h-5 w-1/2 rounded bg-paper-dark mb-6" />
                            <div className="flex gap-2 mb-8">
                              <div className="h-8 w-24 rounded bg-brand/40" />
                              <div className="h-8 w-24 rounded bg-paper-dark" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="h-16 rounded bg-paper-warm" />
                              <div className="h-16 rounded bg-paper-warm" />
                              <div className="h-16 rounded bg-paper-warm" />
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                              <div className="w-6 h-6 rounded-full bg-paper-dark" />
                              <div className="h-2 w-24 rounded bg-paper-dark" />
                              <div className="w-6 h-6 rounded-full bg-paper-dark" />
                              <div className="h-2 w-24 rounded bg-paper-dark" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-brand/10 blur-[60px] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── HOW IT WORKS ───── */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-ink-faint mb-8 pb-5 border-b border-paper-dark">
              <span><span className="text-ink">I.</span> Method / Steps</span>
              <span className="tabular-nums">002 / 007</span>
            </div>

            <div className="max-w-lg mb-16" data-reveal>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
                From message to{" "}
                <span className="text-brand">live page</span>
              </h2>
              <p className="text-base text-ink-mute leading-relaxed">
                Three steps. No signup. No code. Under 30 seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-14">
              {steps.map((step) => (
                <div key={step.n} data-reveal>
                  <span className="text-sm font-mono tracking-widest text-brand mb-4 block">
                    {step.n}
                  </span>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-ink-mute leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CustomerShowcase />

        {/* ───── FEATURES ───── */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-ink-faint mb-8 pb-5 border-b border-paper-dark">
              <span><span className="text-ink">II.</span> Capabilities</span>
              <span className="tabular-nums">003 / 007</span>
            </div>

            <div className="max-w-lg mb-16" data-reveal>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
                Everything{" "}
                <span className="text-brand">you need</span>
              </h2>
              <p className="text-base text-ink-mute leading-relaxed">
                Premium features designed for Nepali businesses.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-dark">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="bg-bone p-7 h-full transition-all duration-200 hover:bg-paper"
                  data-reveal
                >
                  <span className="text-sm font-mono tracking-widest text-paper-dark mb-3 block">
                    {`0${i + 1}`.slice(-2)}
                  </span>
                  <h3 className="text-base font-semibold text-ink mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-base text-ink-mute leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── TESTIMONIALS ───── */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-ink-faint mb-8 pb-5 border-b border-paper-dark">
              <span><span className="text-ink">III.</span> From the Field</span>
              <span className="tabular-nums">004 / 007</span>
            </div>

            <div className="max-w-lg mb-16" data-reveal>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
                What business owners{" "}
                <span className="text-brand">say</span>
              </h2>
              <p className="text-base text-ink-mute leading-relaxed">
                Real feedback from Nepali entrepreneurs using Leafpro.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-paper-dark">
              {testimonials.map((t) => (
                <div key={t.author} className="bg-bone p-7 h-full flex flex-col" data-reveal>
                  <p className="text-base text-ink-mute leading-relaxed mb-8 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="pt-5 border-t border-paper-dark">
                    <p className="text-base font-semibold text-ink">{t.author}</p>
                    <p className="text-sm font-mono tracking-wider text-ink-faint mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── ONBOARDING FLOW ───── */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-bone border-b border-paper-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-ink-faint mb-8 pb-5 border-b border-paper-dark">
              <span><span className="text-ink">IV.</span> Behind the Scenes</span>
              <span className="tabular-nums">005 / 007</span>
            </div>

            <div className="max-w-lg mb-16" data-reveal>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
                What happens when you{" "}
                <span className="text-brand">text us</span>
              </h2>
              <p className="text-base text-ink-mute leading-relaxed">
                Fully automated. From WhatsApp to live page in seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-10">
              {flow.map((step) => (
                <div key={step.n} data-reveal>
                  <span className="text-sm font-mono tracking-widest text-brand mb-4 block">
                    {step.n}
                  </span>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-ink-mute leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-paper-dark">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-ink-faint mb-8 pb-5 border-b border-paper-dark">
              <span><span className="text-ink">V.</span> FAQ</span>
              <span className="tabular-nums">006 / 007</span>
            </div>

            <div className="max-w-lg mb-12" data-reveal>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 font-display">
                Questions &{" "}
                <span className="text-brand">answers</span>
              </h2>
              <p className="text-base text-ink-mute">
                Straight answers. No fluff.
              </p>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <div key={faq.q} data-reveal>
                  <FaqItem
                    question={faq.q}
                    answer={faq.a}
                    open={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-brand-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/30 mb-8 pb-5 border-b border-white/10">
              <span><span className="text-white/60">VII.</span> Start</span>
              <span className="tabular-nums">007 / 007</span>
            </div>

            <div className="max-w-2xl" data-reveal>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-display">
                Get your page{" "}
                <span className="text-brand">right now</span>.
              </h2>
              <p className="text-base text-white/60 mb-9 max-w-md leading-relaxed">
                Send a WhatsApp message. Your page will be ready before you
                finish reading this sentence.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-brand text-brand-dark text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4" />
                Start on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-white/10 bg-brand-dark py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/30 mb-12 pb-6 border-b border-white/10">
            <span>Leafpro &mdash; Vol. 01 / Issue N&ordm; 01</span>
            <span className="tabular-nums">FIN.</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/Logo.png" alt={APP_NAME} className="h-10 w-auto rounded" />
                <span className="text-lg font-semibold tracking-tight text-white">{APP_NAME}</span>
              </div>
              <p className="text-base text-white/50 leading-relaxed max-w-xs">
                The instant landing page platform for Nepali businesses. Text and go live in seconds.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-white/40 mb-4 uppercase">Product</h4>
              <ul className="space-y-2.5">
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Create Page</a></li>
                <li><a href="/dashboard/login" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-white/40 mb-4 uppercase">Company</h4>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-white/60">Made in Nepal</span></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
                <li><span className="text-sm text-white/60">{COORDS}</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-white/40 mb-4 uppercase">Connect</h4>
              <ul className="space-y-2.5">
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Email</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
            <p className="text-xs font-mono tracking-wider text-white/40">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <p className="text-xs font-mono tracking-wider text-white/40">
              Built with care &middot; For Nepali businesses everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
