import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  size?: "sm" | "md";
}

const variants = {
  default: "bg-paper-dark text-ink-mute",
  success: "bg-olive/10 text-olive border-olive/20",
  warning: "bg-mustard/10 text-mustard border-mustard/20",
  danger: "bg-coral/10 text-coral border-coral/20",
  accent: "bg-coral/10 text-coral border-coral/20",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-lg
        border border-transparent
        ${variants[variant]}
        ${sizes[size]}
      `}
    >
      {children}
    </span>
  );
}
