import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "custom";
  color?: string;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  color,
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-accent-purple/20 text-accent-purple border-accent-purple/30",
    success: "bg-accent-green/20 text-accent-green border-accent-green/30",
    warning: "bg-accent-orange/20 text-accent-orange border-accent-orange/30",
    danger: "bg-accent-pink/20 text-accent-pink border-accent-pink/30",
    info: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30",
    custom: "",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium font-body",
        variants[variant],
        sizes[size],
        className
      )}
      style={
        variant === "custom" && color
          ? {
              backgroundColor: `${color}22`,
              color: color,
              borderColor: `${color}44`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
