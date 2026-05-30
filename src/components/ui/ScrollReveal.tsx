"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "rise-lg";
  /** @deprecated use `variant` */
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant,
  direction,
}: ScrollRevealProps) {
  const resolvedVariant =
    variant ||
    (direction === "down" ? "up" : direction) ||
    "up";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.revealed = "true";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={resolvedVariant === "up" ? "" : resolvedVariant}
      data-reveal-delay={delay}
      className={className}
    >
      {children}
    </div>
  );
}

const directions = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  baseDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: staggerDelay, delayChildren: baseDelay },
          },
          hidden: {},
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function fadeInItemVariants(direction: "up" | "down" | "left" | "right" = "up") {
  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };
}
