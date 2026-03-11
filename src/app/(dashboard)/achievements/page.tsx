"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  Star,
  Target,
  BookOpen,
  Clock,
  Zap,
  Award,
  Crown,
  Shield,
  Sparkles,
  Moon,
  Sun,
  Brain,
  Swords,
  Rocket,
  Heart,
  Eye,
  Lock,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
  unlocked: boolean;
  progress?: number;
  target?: number;
  unlockedAt?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Trophy, Flame, Star, Target, BookOpen, Clock, Zap, Award, Crown,
  Shield, Sparkles, Moon, Sun, Brain, Swords, Rocket, Heart, Eye,
};

const rarityColors = {
  common: { color: "#8888AA", label: "Comum", bg: "#8888AA" },
  rare: { color: "#42A5F5", label: "Raro", bg: "#42A5F5" },
  epic: { color: "#AB47BC", label: "Épico", bg: "#AB47BC" },
  legendary: { color: "#FFD600", label: "Lendário", bg: "#FFD600" },
};

const categories = [
  { id: "all", label: "Todas" },
  { id: "study", label: "Estudo" },
  { id: "streak", label: "Streak" },
  { id: "mastery", label: "Domínio" },
  { id: "special", label: "Especial" },
];

const achievements: Achievement[] = [
  // Unlocked
  { id: "1", name: "Primeira Questão", description: "Respondeu sua primeira questão", icon: "Star", category: "study", rarity: "common", xpReward: 50, unlocked: true, unlockedAt: "2026-02-15" },
  { id: "2", name: "Foco Total", description: "Estudou por 1 hora seguida", icon: "Clock", category: "study", rarity: "common", xpReward: 75, unlocked: true, unlockedAt: "2026-02-16" },
  { id: "3", name: "Streak Iniciante", description: "3 dias consecutivos estudando", icon: "Flame", category: "streak", rarity: "common", xpReward: 100, unlocked: true, unlockedAt: "2026-02-18" },
  { id: "4", name: "Dez em Dez", description: "10 questões corretas seguidas", icon: "Target", category: "study", rarity: "rare", xpReward: 200, unlocked: true, unlockedAt: "2026-02-20" },
  { id: "5", name: "Explorador", description: "Estudou 5 matérias diferentes", icon: "BookOpen", category: "study", rarity: "common", xpReward: 100, unlocked: true, unlockedAt: "2026-02-22" },
  { id: "6", name: "Madrugador", description: "Estudou antes das 6h", icon: "Sun", category: "special", rarity: "rare", xpReward: 150, unlocked: true, unlockedAt: "2026-03-01" },
  { id: "7", name: "Noturno", description: "Estudou após meia-noite", icon: "Moon", category: "special", rarity: "rare", xpReward: 150, unlocked: true, unlockedAt: "2026-03-05" },
  { id: "8", name: "Centenário", description: "100 questões respondidas", icon: "Award", category: "study", rarity: "rare", xpReward: 300, unlocked: true, unlockedAt: "2026-03-08" },

  // In progress
  { id: "9", name: "Semana Perfeita", description: "7 dias consecutivos estudando", icon: "Flame", category: "streak", rarity: "rare", xpReward: 250, unlocked: false, progress: 5, target: 7 },
  { id: "10", name: "Maratonista", description: "100 questões em um único dia", icon: "Rocket", category: "study", rarity: "epic", xpReward: 500, unlocked: false, progress: 42, target: 100 },
  { id: "11", name: "Enciclopédia", description: "Estudou todas as matérias em uma semana", icon: "Brain", category: "study", rarity: "epic", xpReward: 400, unlocked: false, progress: 8, target: 12 },
  { id: "12", name: "Perfeccionista", description: "10 questões seguidas corretas", icon: "Target", category: "mastery", rarity: "rare", xpReward: 200, unlocked: false, progress: 7, target: 10 },
  { id: "13", name: "Mestre da Matemática", description: "90%+ de acerto em Matemática", icon: "Crown", category: "mastery", rarity: "epic", xpReward: 500, unlocked: false, progress: 72, target: 90 },
  { id: "14", name: "ENEM Ready", description: "Completou um simulado completo", icon: "Trophy", category: "study", rarity: "epic", xpReward: 600, unlocked: false, progress: 0, target: 1 },

  // Locked
  { id: "15", name: "Mês de Ferro", description: "30 dias consecutivos estudando", icon: "Shield", category: "streak", rarity: "legendary", xpReward: 1000, unlocked: false },
  { id: "16", name: "Mil Questões", description: "1000 questões respondidas", icon: "Sparkles", category: "study", rarity: "legendary", xpReward: 1500, unlocked: false, progress: 245, target: 1000 },
  { id: "17", name: "Polímata", description: "90%+ em todas as matérias", icon: "Crown", category: "mastery", rarity: "legendary", xpReward: 2000, unlocked: false },
  { id: "18", name: "Boss Slayer", description: "Venceu 10 Boss Battles", icon: "Swords", category: "special", rarity: "epic", xpReward: 750, unlocked: false, progress: 2, target: 10 },
  { id: "19", name: "Velocista", description: "20 questões corretas em 10 minutos", icon: "Zap", category: "special", rarity: "epic", xpReward: 500, unlocked: false },
  { id: "20", name: "Mestre Supremo", description: "Alcançou nível Lenda", icon: "Crown", category: "mastery", rarity: "legendary", xpReward: 5000, unlocked: false },
  { id: "21", name: "Combo Master", description: "Combo de 20x em uma sessão", icon: "Flame", category: "study", rarity: "epic", xpReward: 400, unlocked: false, progress: 8, target: 20 },
  { id: "22", name: "Dedicação Total", description: "50 horas de estudo acumuladas", icon: "Heart", category: "study", rarity: "rare", xpReward: 300, unlocked: false, progress: 28, target: 50 },
  { id: "23", name: "Visionário", description: "Definiu e completou 10 metas semanais", icon: "Eye", category: "special", rarity: "rare", xpReward: 250, unlocked: false, progress: 3, target: 10 },
  { id: "24", name: "Cientista", description: "90%+ em Física, Química e Biologia", icon: "Brain", category: "mastery", rarity: "legendary", xpReward: 1500, unlocked: false },
  { id: "25", name: "Humanista", description: "90%+ em História, Geografia, Filosofia e Sociologia", icon: "BookOpen", category: "mastery", rarity: "legendary", xpReward: 1500, unlocked: false },
  { id: "26", name: "Trilha Completa", description: "Completou todos os tópicos de uma matéria", icon: "Award", category: "mastery", rarity: "epic", xpReward: 600, unlocked: false },
  { id: "27", name: "Estuda Rápido", description: "Respondeu 50 questões fáceis sem erro", icon: "Zap", category: "study", rarity: "rare", xpReward: 200, unlocked: false, progress: 18, target: 50 },
  { id: "28", name: "Desafiante", description: "Respondeu 50 questões difíceis", icon: "Swords", category: "study", rarity: "epic", xpReward: 400, unlocked: false, progress: 12, target: 50 },
  { id: "29", name: "Primeiro Simulado", description: "Completou seu primeiro simulado cronometrado", icon: "Clock", category: "study", rarity: "common", xpReward: 100, unlocked: false },
  { id: "30", name: "Lenda Viva", description: "Desbloqueou 25 conquistas", icon: "Sparkles", category: "special", rarity: "legendary", xpReward: 3000, unlocked: false, progress: 8, target: 25 },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? achievements
    : achievements.filter((a) => a.category === activeCategory);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXpFromAchievements = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Conquistas</h1>
          <p className="text-sm text-foreground-muted mt-1">
            {unlockedCount} de {achievements.length} desbloqueadas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-mono font-bold text-accent-purple">
              {totalXpFromAchievements} XP
            </p>
            <p className="text-xs text-foreground-muted">ganhos em conquistas</p>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <AnimatedProgress
        value={(unlockedCount / achievements.length) * 100}
        color="#FFD600"
        height="md"
        showLabel
        label="Progresso geral"
      />

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
              activeCategory === cat.id
                ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                : "bg-background-card text-foreground-muted border border-border hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((achievement, i) => {
          const Icon = iconMap[achievement.icon] ?? Trophy;
          const rarity = rarityColors[achievement.rarity];
          const hasProgress = achievement.progress !== undefined && achievement.target !== undefined;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard
                className={cn(
                  "relative overflow-hidden",
                  !achievement.unlocked && "opacity-70"
                )}
                glowColor={achievement.unlocked ? rarity.color : undefined}
              >
                {/* Rarity indicator */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-full"
                  style={{ backgroundColor: rarity.color }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative",
                      achievement.unlocked ? "opacity-100" : "opacity-50"
                    )}
                    style={{ backgroundColor: `${rarity.color}22` }}
                  >
                    {achievement.unlocked ? (
                      <Icon className="w-6 h-6" style={{ color: rarity.color }} />
                    ) : (
                      <Lock className="w-5 h-5 text-foreground-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold truncate">
                        {achievement.name}
                      </h3>
                      <Badge variant="custom" color={rarity.color} size="sm">
                        {rarity.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Zap className="w-3 h-3 text-accent-purple" />
                      <span className="text-xs font-mono text-accent-purple">
                        +{achievement.xpReward} XP
                      </span>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="text-[10px] text-foreground-muted ml-auto">
                          {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>
                    {hasProgress && !achievement.unlocked && (
                      <div className="mt-2">
                        <AnimatedProgress
                          value={(achievement.progress! / achievement.target!) * 100}
                          color={rarity.color}
                          height="sm"
                          showLabel
                          label={`${achievement.progress}/${achievement.target}`}
                        />
                      </div>
                    )}
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
