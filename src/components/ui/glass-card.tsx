"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "glow" | "interactive";
  glowColor?: string;
  noPadding?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  glowColor,
  noPadding = false,
  ...props
}: GlassCardProps) {
  const variants = {
    default: "bg-background-card/80 border border-border backdrop-blur-md",
    elevated:
      "bg-background-elevated/80 border border-border backdrop-blur-md shadow-card",
    glow: "bg-background-card/80 border border-border backdrop-blur-md shadow-glow-purple",
    interactive:
      "bg-background-card/80 border border-border backdrop-blur-md hover:border-border-hover hover:shadow-card-hover transition-all duration-300 cursor-pointer",
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl",
        variants[variant],
        !noPadding && "p-6",
        className
      )}
      style={
        glowColor
          ? { boxShadow: `0 0 20px ${glowColor}33, inset 0 0 20px ${glowColor}11` }
          : undefined
      }
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
