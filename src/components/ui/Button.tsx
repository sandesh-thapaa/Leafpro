"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-coral text-bone hover:brightness-110 shadow-sm hover:shadow-md active:shadow-sm",
  secondary:
    "bg-paper-dark text-ink hover:bg-paper-warm active:bg-paper-dark",
  outline:
    "border border-paper-dark text-ink-mute hover:border-ink hover:text-ink active:bg-paper",
  ghost:
    "text-ink-mute hover:text-ink hover:bg-paper-dark active:bg-paper-dark",
  danger:
    "bg-coral/10 text-coral hover:bg-coral/20 active:bg-coral/30",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled,
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const disabled = isDisabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-medium
          rounded transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-coral/30 focus:ring-offset-1
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          active:scale-[0.98]
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
