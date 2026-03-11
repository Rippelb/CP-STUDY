"use client";

import { useState, useCallback } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { calculateLevel, xpForNextLevel } from "@/lib/utils";

interface XpAnimation {
  id: string;
  amount: number;
  x: number;
  y: number;
}

export function useXP() {
  const { user, addXp, updateLevel } = useUserStore();
  const [animations, setAnimations] = useState<XpAnimation[]>([]);

  const awardXp = useCallback(
    async (amount: number, position?: { x: number; y: number }) => {
      if (!user || amount <= 0) return;

      // Add animation
      const animId = Math.random().toString(36).substring(7);
      if (position) {
        setAnimations((prev) => [
          ...prev,
          { id: animId, amount, x: position.x, y: position.y },
        ]);
        setTimeout(() => {
          setAnimations((prev) => prev.filter((a) => a.id !== animId));
        }, 1000);
      }

      // Update store
      addXp(amount);

      // Check level up
      const newXp = user.xp + amount;
      const newLevel = calculateLevel(newXp);
      if (newLevel > user.level) {
        updateLevel(newLevel);
      }

      // Persist to server
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ xp: amount }),
        });
      } catch {
        // Silent fail for XP updates
      }
    },
    [user, addXp, updateLevel]
  );

  const levelProgress = user ? xpForNextLevel(user.xp) : null;

  return { awardXp, animations, levelProgress };
}
