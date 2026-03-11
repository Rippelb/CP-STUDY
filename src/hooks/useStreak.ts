"use client";

import { useCallback } from "react";
import { useUserStore } from "@/stores/useUserStore";

export function useStreak() {
  const { user, updateStreak } = useUserStore();

  const checkAndUpdateStreak = useCallback(async () => {
    if (!user) return;

    try {
      const res = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "study" }),
      });
      const data = await res.json();
      if (data.streak !== undefined) {
        updateStreak(data.streak);
      }
    } catch {
      // Silent fail
    }
  }, [user, updateStreak]);

  return {
    streak: user?.streak ?? 0,
    bestStreak: user?.bestStreak ?? 0,
    streakShields: user?.streakShields ?? 0,
    checkAndUpdateStreak,
  };
}
