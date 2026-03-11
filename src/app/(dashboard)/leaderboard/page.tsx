"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Flame, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn, getLevelName } from "@/lib/utils";

interface LeaderboardUser {
  id: string;
  name: string;
  image: string | null;
  xp: number;
  level: number;
  streak: number;
  questionsAnswered: number;
  accuracy: number;
}

const mockUsers: LeaderboardUser[] = [
  { id: "1", name: "Maria Silva", image: null, xp: 15420, level: 12, streak: 45, questionsAnswered: 1250, accuracy: 87 },
  { id: "2", name: "João Santos", image: null, xp: 12890, level: 11, streak: 32, questionsAnswered: 980, accuracy: 82 },
  { id: "3", name: "Ana Costa", image: null, xp: 11200, level: 10, streak: 28, questionsAnswered: 890, accuracy: 85 },
  { id: "4", name: "Pedro Oliveira", image: null, xp: 9800, level: 9, streak: 15, questionsAnswered: 750, accuracy: 79 },
  { id: "5", name: "Lucas Ferreira", image: null, xp: 8500, level: 8, streak: 20, questionsAnswered: 680, accuracy: 81 },
  { id: "6", name: "Beatriz Lima", image: null, xp: 7200, level: 8, streak: 12, questionsAnswered: 560, accuracy: 78 },
  { id: "demo-user-1", name: "Você (Estudante)", image: null, xp: 0, level: 1, streak: 0, questionsAnswered: 0, accuracy: 0 },
  { id: "7", name: "Gabriel Souza", image: null, xp: 6100, level: 7, streak: 8, questionsAnswered: 490, accuracy: 76 },
  { id: "8", name: "Juliana Martins", image: null, xp: 5400, level: 7, streak: 10, questionsAnswered: 420, accuracy: 80 },
  { id: "9", name: "Rafael Almeida", image: null, xp: 4800, level: 6, streak: 6, questionsAnswered: 380, accuracy: 74 },
  { id: "10", name: "Camila Rodrigues", image: null, xp: 4200, level: 6, streak: 4, questionsAnswered: 340, accuracy: 72 },
  { id: "11", name: "Thiago Pereira", image: null, xp: 3600, level: 5, streak: 3, questionsAnswered: 290, accuracy: 70 },
  { id: "12", name: "Isabela Santos", image: null, xp: 3100, level: 5, streak: 7, questionsAnswered: 250, accuracy: 75 },
  { id: "13", name: "Mateus Costa", image: null, xp: 2200, level: 4, streak: 2, questionsAnswered: 180, accuracy: 68 },
  { id: "14", name: "Fernanda Lima", image: null, xp: 1800, level: 4, streak: 1, questionsAnswered: 150, accuracy: 71 },
];

const periods = [
  { id: "weekly", label: "Semanal" },
  { id: "monthly", label: "Mensal" },
  { id: "allTime", label: "Geral" },
];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("allTime");

  const sorted = [...mockUsers].sort((a, b) => b.xp - a.xp);
  const userRank = sorted.findIndex((u) => u.id === "demo-user-1") + 1;
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumOrder = [1, 0, 2]; // Silver, Gold, Bronze positions
  const podiumHeights = ["h-28", "h-36", "h-24"];
  const podiumColors = ["#C0C0C0", "#FFD600", "#CD7F32"];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Ranking</h1>
          <p className="text-sm text-foreground-muted mt-1">
            Sua posição:{" "}
            <span className="text-accent-purple font-mono font-bold">
              #{userRank}
            </span>{" "}
            de {sorted.length}
          </p>
        </div>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2">
        {periods.map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              period === p.id
                ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                : "bg-background-card text-foreground-muted border border-border hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <GlassCard className="!pb-0">
        <div className="flex items-end justify-center gap-2 sm:gap-4 pt-8 pb-0">
          {podiumOrder.map((rank, i) => {
            const user = top3[rank];
            if (!user) return null;
            return (
              <motion.div
                key={rank}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.15, type: "spring" }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2"
                    style={{
                      borderColor: podiumColors[i],
                      backgroundColor: `${podiumColors[i]}22`,
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  {rank === 0 && (
                    <Crown
                      className="w-5 h-5 absolute -top-3 left-1/2 -translate-x-1/2"
                      style={{ color: "#FFD600" }}
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-center max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </p>
                <p className="text-xs font-mono text-foreground-muted">
                  {user.xp.toLocaleString()} XP
                </p>
                <div
                  className={cn(
                    "w-24 rounded-t-xl mt-3 flex items-end justify-center pb-3",
                    podiumHeights[i]
                  )}
                  style={{
                    background: `linear-gradient(180deg, ${podiumColors[i]}33, ${podiumColors[i]}11)`,
                    borderTop: `2px solid ${podiumColors[i]}`,
                  }}
                >
                  <span
                    className="text-2xl font-display font-bold"
                    style={{ color: podiumColors[i] }}
                  >
                    {rank + 1}°
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Full Rankings */}
      <div className="space-y-2">
        {rest.map((user, i) => {
          const rank = i + 4;
          const isCurrentUser = user.id === "demo-user-1";

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard
                className={cn(
                  "!py-3",
                  isCurrentUser &&
                    "!border-accent-purple/40 !bg-accent-purple/5"
                )}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={cn(
                      "w-8 text-center font-mono font-bold text-sm flex-shrink-0",
                      isCurrentUser ? "text-accent-purple" : "text-foreground-muted"
                    )}
                  >
                    #{rank}
                  </span>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                      isCurrentUser
                        ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                        : "bg-background-elevated text-foreground-muted"
                    )}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          isCurrentUser && "text-accent-purple"
                        )}
                      >
                        {user.name}
                      </p>
                      <Badge variant="custom" color={isCurrentUser ? "#6C63FF" : "#8888AA"} size="sm">
                        Nv. {user.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground-muted">
                      {getLevelName(user.level)} • {user.questionsAnswered} questões
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs flex-shrink-0">
                    <div className="flex items-center gap-1 text-accent-orange">
                      <Flame className="w-3 h-3" />
                      <span className="font-mono">{user.streak}</span>
                    </div>
                    <div className="flex items-center gap-1 text-accent-green">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-mono">{user.accuracy}%</span>
                    </div>
                  </div>
                  <div className="text-right min-w-[60px] sm:min-w-[80px] flex-shrink-0">
                    <span className="font-mono font-bold text-sm">
                      {user.xp.toLocaleString()}
                    </span>
                    <span className="text-foreground-muted ml-1 hidden sm:inline">XP</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
