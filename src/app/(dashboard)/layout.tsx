"use client";

import { useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Particles } from "@/components/layout/particles";
import { useUserStore } from "@/stores/useUserStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { cn } from "@/lib/utils";

// Mock user for demo (replace with real auth)
const MOCK_USER = {
  id: "demo-user-1",
  name: "Estudante",
  email: "estudante@email.com",
  image: null,
  xp: 0,
  level: 1,
  streak: 0,
  bestStreak: 0,
  streakShields: 0,
  lastStudyDate: null,
  targetExam: "ENEM",
  examDate: "2026-11-08",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, user } = useUserStore();
  const { collapsed, setMobileOpen } = useSidebarStore();

  useEffect(() => {
    if (!user) {
      setUser(MOCK_USER);
    }
  }, [setUser, user]);

  return (
    <div className="min-h-screen bg-background relative">
      <Particles />
      <Sidebar />

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-background-card/95 backdrop-blur-xl border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-bold text-gradient">CP Study</span>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "relative z-10 pt-14 lg:pt-0 transition-all duration-300",
          // On mobile: no margin. On desktop: margin based on sidebar state.
          collapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"
        )}
      >
        <div className="hidden lg:block">
          <Header />
        </div>
        <main className="p-4 lg:p-6 max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
