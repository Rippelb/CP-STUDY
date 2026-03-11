"use client";

import { Bell, Search, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
import { getGreeting, daysUntilExam } from "@/lib/utils";
import { ENEM_DATE } from "@/lib/constants";

export function Header() {
  const { user } = useUserStore();
  const daysLeft = daysUntilExam(ENEM_DATE);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-display font-bold">
            {getGreeting()},{" "}
            <span className="text-gradient">
              {user?.name?.split(" ")[0] ?? "Estudante"}
            </span>
            !
          </h2>
          {daysLeft !== null && daysLeft > 0 && (
            <p className="text-xs text-foreground-muted">
              Faltam{" "}
              <span className="text-accent-cyan font-mono font-bold">
                {daysLeft}
              </span>{" "}
              dias para o ENEM 2026
            </p>
          )}
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all">
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-pink" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
