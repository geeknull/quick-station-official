"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium transition-all rounded-xl cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white hover:shadow-lg hover:shadow-[var(--primary)]/30 hover:-translate-y-0.5",
    secondary:
      "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--card-hover)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
