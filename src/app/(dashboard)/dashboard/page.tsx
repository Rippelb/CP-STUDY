"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Clock,
  Flame,
  Trophy,
  BookOpen,
  ChevronRight,
  Sparkles,
  Medal,
  CheckCircle2,
  XCircle,
  Zap,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/useUserStore";
import { cn, formatNumber, getGreeting } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const statsCards = [
  {
    label: "Questões Respondidas",
    value: 0,
    icon: Brain,
    color: "#6C63FF",
    suffix: "",
    decimals: 0,
  },
  {
    label: "Taxa de Acerto",
    value: 0,
    icon: Target,
    color: "#00D4FF",
    suffix: "%",
    decimals: 1,
  },
  {
    label: "Horas esta Semana",
    value: 0,
    icon: Clock,
    color: "#FF6584",
    suffix: "h",
    decimals: 1,
  },
  {
    label: "Streak Atual",
    value: 0,
    icon: Flame,
    color: "#FF9100",
    suffix: " dias",
    decimals: 0,
  },
] as const;

const radarData = [
  { subject: "Matemática", score: 0, fullMark: 100 },
  { subject: "Física", score: 0, fullMark: 100 },
  { subject: "Química", score: 0, fullMark: 100 },
  { subject: "Biologia", score: 0, fullMark: 100 },
  { subject: "Português", score: 0, fullMark: 100 },
  { subject: "História", score: 0, fullMark: 100 },
  { subject: "Geografia", score: 0, fullMark: 100 },
];

const questionOfTheDay = {
  id: "q-2026-0310",
  subject: "Física",
  topic: "Termodinâmica",
  difficulty: "Média",
  text: "Um gás ideal sofre uma transformação isobárica, passando de um volume de 2L para 6L à pressão constante de 3 atm. Qual o trabalho realizado pelo gás nessa transformação?",
  alternatives: [
    "A) 6 atm·L",
    "B) 9 atm·L",
    "C) 12 atm·L",
    "D) 18 atm·L",
    "E) 24 atm·L",
  ],
};

const weeklyGoals = [
  { label: "Questões de Matemática", current: 0, target: 60, color: "#6C63FF" },
  { label: "Redações escritas", current: 0, target: 3, color: "#FF6584" },
  { label: "Simulados completos", current: 0, target: 2, color: "#00D4FF" },
  { label: "Revisões de erros", current: 0, target: 40, color: "#FF9100" },
];

const recentActivities: Array<{
  id: number;
  type: "correct" | "wrong" | "streak";
  subject: string;
  description: string;
  xp: number;
  time: string;
}> = [];

const leaderboard = [
  { rank: 1, name: "Maria S.", xp: 15420, avatar: "MS", level: 12 },
  { rank: 2, name: "João S.", xp: 12890, avatar: "JS", level: 11 },
  { rank: 3, name: "Ana C.", xp: 11200, avatar: "AC", level: 10 },
  { rank: 4, name: "Pedro O.", xp: 9800, avatar: "PO", level: 9 },
  { rank: 5, name: "Lucas F.", xp: 8500, avatar: "LF", level: 8 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function getRankColor(rank: number): string {
  if (rank === 1) return "#FFD700";
  if (rank === 2) return "#C0C0C0";
  if (rank === 3) return "#CD7F32";
  return "#6C63FF";
}

function getActivityIcon(type: string) {
  switch (type) {
    case "correct":
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    case "wrong":
      return <XCircle className="h-4 w-4 text-red-400" />;
    case "streak":
      return <Zap className="h-4 w-4 text-yellow-400" />;
    default:
      return <BookOpen className="h-4 w-4 text-purple-400" />;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const greeting = getGreeting();
  const displayName = user?.name?.split(" ")[0] ?? "Estudante";

  return (
    <motion.div
      className="min-h-screen px-4 py-8 md:px-8 lg:px-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header greeting                                                     */}
      {/* ------------------------------------------------------------------ */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
          {greeting},{" "}
          <span className="bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] bg-clip-text text-transparent">
            {displayName}
          </span>
        </h1>
        <p className="mt-1 text-sm text-foreground-muted font-body">
          {(user?.xp ?? 0) > 0
            ? "Continue assim! Sua consistência está fazendo a diferença."
            : "Comece seus estudos agora e acompanhe seu progresso aqui!"}
        </p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Stats cards                                                         */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <GlassCard
              key={stat.label}
              variant="glow"
              glowColor={stat.color}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative overflow-hidden group"
            >
              {/* Background glow circle */}
              <div
                className="absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: stat.color }}
              />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-xs font-body text-foreground-muted mb-1">
                    {stat.label}
                  </p>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={1.2}
                    className="text-2xl md:text-3xl font-bold text-foreground"
                  />
                </div>
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: `${stat.color}22` }}
                >
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Main grid: Radar chart + Question of the day                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {/* Radar Chart */}
        <motion.div variants={item} className="lg:col-span-3">
          <GlassCard
            variant="elevated"
            className="h-full"
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#6C63FF]" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Desempenho por Matéria
                </h2>
              </div>
              <Badge variant="info" size="md">
                Últimos 30 dias
              </Badge>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid
                    stroke="#ffffff10"
                    radialLines={false}
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "#ffffffaa",
                      fontSize: 11,
                      fontFamily: "inherit",
                    }}
                  />
                  <Radar
                    name="Desempenho"
                    dataKey="score"
                    stroke="#6C63FF"
                    fill="#6C63FF"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Máximo"
                    dataKey="fullMark"
                    stroke="#00D4FF"
                    fill="#00D4FF"
                    fillOpacity={0.05}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Question of the day */}
        <motion.div variants={item} className="lg:col-span-2">
          <GlassCard
            variant="interactive"
            className="h-full flex flex-col"
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-[#FF6584]" />
              <h2 className="text-lg font-display font-semibold text-foreground">
                Questão do Dia
              </h2>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="info" size="sm">
                {questionOfTheDay.subject}
              </Badge>
              <Badge variant="warning" size="sm">
                {questionOfTheDay.difficulty}
              </Badge>
              <Badge variant="default" size="sm">
                {questionOfTheDay.topic}
              </Badge>
            </div>

            <p className="text-sm text-foreground-muted font-body leading-relaxed mb-4 flex-1">
              {questionOfTheDay.text}
            </p>

            <div className="space-y-2 mb-5">
              {questionOfTheDay.alternatives.map((alt) => (
                <div
                  key={alt}
                  className="text-xs text-foreground-muted font-body px-3 py-2 rounded-lg bg-background-elevated/60 border border-border hover:border-[#6C63FF]/40 transition-colors cursor-pointer"
                >
                  {alt}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-auto w-full rounded-lg py-2.5 text-sm font-semibold font-body text-white transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                boxShadow: "0 0 20px #6C63FF33",
              }}
            >
              Responder
            </button>
          </GlassCard>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom grid: Goals + Activities + Leaderboard                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly goals */}
        <motion.div variants={item}>
          <GlassCard
            variant="elevated"
            className="h-full"
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#00D4FF]" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Metas Semanais
                </h2>
              </div>
              <Badge variant="success" size="sm">
                Semana 10
              </Badge>
            </div>

            <div className="space-y-5">
              {weeklyGoals.map((goal) => (
                <div key={goal.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-muted font-body">
                      {goal.label}
                    </span>
                    <span className="text-xs font-mono text-foreground-muted">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <AnimatedProgress
                    value={(goal.current / goal.target) * 100}
                    color={goal.color}
                    height="sm"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Recent activities */}
        <motion.div variants={item}>
          <GlassCard
            variant="elevated"
            className="h-full"
            transition={{ duration: 0.4, delay: 0.65 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#6C63FF]" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Atividades Recentes
                </h2>
              </div>
              <button
                type="button"
                className="text-xs text-[#6C63FF] font-body flex items-center gap-0.5 hover:underline"
              >
                Ver tudo <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              {recentActivities.length === 0 ? (
                <div className="text-center py-6">
                  <BookOpen className="w-8 h-8 text-foreground-muted/40 mx-auto mb-2" />
                  <p className="text-xs text-foreground-muted font-body">
                    Nenhuma atividade ainda. Comece a praticar!
                  </p>
                </div>
              ) : (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-background-elevated/40 border border-border/50"
                  >
                    <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body text-foreground leading-snug truncate">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="custom"
                          color={
                            activity.subject === "Matemática"
                              ? "#6C63FF"
                              : activity.subject === "Química"
                                ? "#FF6584"
                                : activity.subject === "Português"
                                  ? "#FF9100"
                                  : activity.subject === "Biologia"
                                    ? "#00E676"
                                    : "#6C63FF"
                          }
                          size="sm"
                        >
                          {activity.subject}
                        </Badge>
                        <span className="text-[10px] text-foreground-muted font-body">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                    {activity.xp > 0 && (
                      <span className="text-xs font-mono text-green-400 whitespace-nowrap">
                        +{activity.xp} XP
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Leaderboard */}
        <motion.div variants={item}>
          <GlassCard
            variant="elevated"
            className="h-full"
            transition={{ duration: 0.4, delay: 0.75 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#FFD700]" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Top 5 da Semana
                </h2>
              </div>
              <Badge variant="warning" size="sm">
                <Medal className="h-3 w-3 mr-1" />
                Ranking
              </Badge>
            </div>

            <div className="space-y-2.5">
              {leaderboard.map((player) => {
                const isCurrentUser =
                  user?.name && player.name.startsWith(user.name.split(" ")[0]);
                return (
                  <div
                    key={player.rank}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-lg border transition-colors",
                      isCurrentUser
                        ? "bg-[#6C63FF]/10 border-[#6C63FF]/30"
                        : "bg-background-elevated/40 border-border/50"
                    )}
                  >
                    {/* Rank */}
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold font-mono"
                      style={{
                        backgroundColor: `${getRankColor(player.rank)}22`,
                        color: getRankColor(player.rank),
                        border: `1px solid ${getRankColor(player.rank)}44`,
                      }}
                    >
                      {player.rank}
                    </div>

                    {/* Avatar */}
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, #6C63FF, #00D4FF)`,
                      }}
                    >
                      {player.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body text-foreground truncate">
                        {player.name}
                      </p>
                      <p className="text-[10px] font-body text-foreground-muted">
                        Nível {player.level}
                      </p>
                    </div>

                    {/* XP */}
                    <span className="text-xs font-mono text-foreground-muted whitespace-nowrap">
                      {formatNumber(player.xp)} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
