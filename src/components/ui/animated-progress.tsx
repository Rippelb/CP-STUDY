"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number; // 0-100
  color?: string;
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export function AnimatedProgress({
  value,
  color = "#6C63FF",
  height = "md",
  showLabel = false,
  label,
  className,
  animated = true,
}: AnimatedProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-body text-foreground-muted">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-xs font-mono text-foreground-muted">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-background-elevated overflow-hidden",
          heights[height]
        )}
      >
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            boxShadow: `0 0 10px ${color}44`,
          }}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
              animation: "shimmer 2s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
