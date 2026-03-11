"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  glowColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function GlowButton({
  children,
  className,
  variant = "primary",
  size = "md",
  glowColor,
  isLoading = false,
  disabled,
  type = "button",
  onClick,
}: GlowButtonProps) {
  const variants = {
    primary:
      "bg-accent-purple text-white hover:bg-accent-purple/90 shadow-glow-purple",
    secondary:
      "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 hover:bg-accent-cyan/30",
    danger:
      "bg-accent-pink/20 text-accent-pink border border-accent-pink/30 hover:bg-accent-pink/30",
    ghost:
      "bg-transparent text-foreground-muted hover:text-foreground hover:bg-background-elevated",
    outline:
      "bg-transparent text-foreground border border-border hover:border-accent-purple hover:text-accent-purple",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-8 py-3.5 text-base rounded-xl",
  };

  return (
    <motion.button
      whileHover={!(disabled || isLoading) ? { scale: 1.02 } : undefined}
      whileTap={!(disabled || isLoading) ? { scale: 0.98 } : undefined}
      className={cn(
        "font-body font-medium transition-all duration-200 inline-flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      style={
        glowColor
          ? { boxShadow: `0 0 20px ${glowColor}44` }
          : undefined
      }
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
