"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Target,
  Flame,
  Zap,
  Trophy,
  BookOpen,
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  Moon,
  Bell,
  Shield,
  Edit3,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/useUserStore";
import { getLevelName, xpForNextLevel } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("stats");
  const levelProgress = user ? xpForNextLevel(user.xp) : null;

  const stats = [
    { label: "Questões Resolvidas", value: 0, icon: Target, color: "#6C63FF" },
    { label: "Taxa de Acerto", value: 0, suffix: "%", icon: TrendingUp, color: "#00E676" },
    { label: "Horas Estudadas", value: 0, icon: Clock, color: "#00D4FF" },
    { label: "Streak Atual", value: user?.streak ?? 0, suffix: " dias", icon: Flame, color: "#FF9100" },
    { label: "Melhor Streak", value: user?.bestStreak ?? 0, suffix: " dias", icon: Shield, color: "#FFD600" },
    { label: "Conquistas", value: 0, suffix: "/30", icon: Trophy, color: "#FF6584" },
    { label: "XP Total", value: user?.xp ?? 0, icon: Zap, color: "#6C63FF" },
    { label: "Matérias Estudadas", value: 0, suffix: "/12", icon: BookOpen, color: "#AB47BC" },
  ];

  const recentActivity: Array<{ action: string; time: string; xp: string }> = [];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <GlassCard variant="elevated">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="relative group flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent-purple/20 flex items-center justify-center border-2 border-accent-purple/30">
              {user?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.image}
                  alt={user.name ?? ""}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-accent-purple" />
              )}
            </div>
            <button className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-accent-purple flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit3 className="w-3 h-3 text-white" />
            </button>
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-display font-bold truncate">
                {user?.name ?? "Estudante"}
              </h1>
              <Badge variant="custom" color="#6C63FF">
                Nv. {user?.level ?? 1} — {getLevelName(user?.level ?? 1)}
              </Badge>
            </div>
            <p className="text-sm text-foreground-muted mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{user?.email ?? "estudante@email.com"}</span>
            </p>
            <p className="text-sm text-foreground-muted mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              Membro desde Fevereiro 2026
            </p>
            {levelProgress && (
              <div className="mt-4 max-w-sm mx-auto sm:mx-0">
                <AnimatedProgress
                  value={levelProgress.progress}
                  color="#6C63FF"
                  height="md"
                  showLabel
                  label={`${levelProgress.current} / ${levelProgress.needed} XP para o próximo nível`}
                />
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <GlowButton variant="outline" size="sm">
              <Settings className="w-4 h-4" />
              Editar
            </GlowButton>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "stats", label: "Estatísticas" },
          { id: "activity", label: "Atividade Recente" },
          { id: "settings", label: "Configurações" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                : "bg-background-card text-foreground-muted border border-border hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="text-center stat-card-glow">
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="flex items-baseline justify-center">
                    <AnimatedCounter
                      value={stat.value}
                      className="text-2xl font-bold"
                    />
                    {stat.suffix && (
                      <span className="text-sm text-foreground-muted ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-foreground-muted mt-1">
                    {stat.label}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="space-y-3">
          {recentActivity.length === 0 ? (
            <GlassCard className="text-center py-8">
              <Clock className="w-8 h-8 text-foreground-muted/40 mx-auto mb-2" />
              <p className="text-sm text-foreground-muted">
                Nenhuma atividade registrada ainda.
              </p>
              <p className="text-xs text-foreground-muted/60 mt-1">
                Comece a estudar para ver seu histórico aqui!
              </p>
            </GlassCard>
          ) : (
            recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="!py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent-purple" />
                    <div className="flex-1">
                      <p className="text-sm">{item.action}</p>
                      <p className="text-xs text-foreground-muted">{item.time}</p>
                    </div>
                    <span className="text-xs font-mono text-accent-purple">
                      {item.xp}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-4">
          <GlassCard>
            <h3 className="font-display font-bold mb-4">Preferências</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-foreground-muted" />
                  <div>
                    <p className="text-sm font-medium">Tema Escuro</p>
                    <p className="text-xs text-foreground-muted">
                      Ativado por padrão
                    </p>
                  </div>
                </div>
                <div className="w-10 h-6 rounded-full bg-accent-purple relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-foreground-muted" />
                  <div>
                    <p className="text-sm font-medium">Notificações</p>
                    <p className="text-xs text-foreground-muted">
                      Lembretes de estudo
                    </p>
                  </div>
                </div>
                <div className="w-10 h-6 rounded-full bg-accent-purple relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display font-bold mb-4">Meta do Vestibular</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Prova alvo</span>
                <Badge variant="info">{user?.targetExam ?? "ENEM"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data da prova</span>
                <span className="text-sm font-mono text-accent-cyan">
                  08/11/2026
                </span>
              </div>
            </div>
          </GlassCard>

          <GlowButton variant="danger" className="w-full">
            <LogOut className="w-4 h-4" />
            Sair da conta
          </GlowButton>
        </div>
      )}
    </div>
  );
}
