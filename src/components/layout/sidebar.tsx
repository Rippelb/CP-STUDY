"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  Trophy,
  User,
  Medal,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { useUserStore } from "@/stores/useUserStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { xpForNextLevel, getLevelName } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subjects", label: "Matérias", icon: BookOpen },
  { href: "/practice", label: "Praticar", icon: GraduationCap },
  { href: "/schedule", label: "Cronograma", icon: Calendar },
  { href: "/achievements", label: "Conquistas", icon: Trophy },
  { href: "/leaderboard", label: "Ranking", icon: Medal },
  { href: "/profile", label: "Perfil", icon: User },
];

export function Sidebar() {
  const { collapsed, mobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const pathname = usePathname();
  const { user } = useUserStore();
  const levelProgress = user ? xpForNextLevel(user.xp) : null;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-screen z-50 flex flex-col",
          "bg-background-card/95 backdrop-blur-xl border-r border-border",
          "transition-transform duration-300 ease-in-out lg:transition-all lg:translate-x-0",
          !mobileOpen && "-translate-x-full lg:translate-x-0"
        )}
        animate={{ width: collapsed ? 72 : 260 }}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-accent-purple" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display font-bold text-lg text-gradient whitespace-nowrap"
              >
                CP Study
              </motion.span>
            )}
          </AnimatePresence>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1 text-foreground-muted hover:text-foreground lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Mini */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0 border border-accent-purple/30">
              {user?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.image}
                  alt={user.name ?? ""}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-accent-purple" />
              )}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name ?? "Estudante"}
                  </p>
                  <p className="text-[10px] text-accent-purple font-mono">
                    Nv. {user?.level ?? 1} — {getLevelName(user?.level ?? 1)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!collapsed && levelProgress && (
            <div className="mt-3">
              <AnimatedProgress
                value={levelProgress.progress}
                color="#6C63FF"
                height="sm"
                showLabel
                label={`${levelProgress.current}/${levelProgress.needed} XP`}
              />
            </div>
          )}
        </div>

        {/* Streak */}
        {!collapsed && user && (
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Flame
                className={cn(
                  "w-4 h-4",
                  user.streak > 0 ? "text-accent-orange" : "text-foreground-muted"
                )}
              />
              <span className="text-xs text-foreground-muted">
                {user.streak > 0
                  ? `${user.streak} dia${user.streak > 1 ? "s" : ""} de streak`
                  : "Comece seu streak hoje!"}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-accent-purple/15 text-accent-purple border border-accent-purple/20"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                  )}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive ? "text-accent-purple" : ""
                    )}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 rounded-r bg-accent-purple"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle - desktop only */}
        <button
          onClick={toggle}
          className="hidden lg:flex p-4 border-t border-border items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </motion.aside>
    </>
  );
}
