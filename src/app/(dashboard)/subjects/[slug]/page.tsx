"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  PlayCircle,
  BarChart3,
  Video,
  CheckCircle2,
  Circle,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Badge } from "@/components/ui/badge";
import { GlowButton } from "@/components/ui/glow-button";
import { cn, getSubjectColor } from "@/lib/utils";

const tabs = [
  { id: "conteudos", label: "Conteúdos", icon: BookOpen },
  { id: "exercicios", label: "Exercícios", icon: PlayCircle },
  { id: "desempenho", label: "Desempenho", icon: BarChart3 },
  { id: "videoaulas", label: "Videoaulas", icon: Video },
];

// Mock data for topics by subject
const subjectData: Record<string, {
  name: string;
  topics: Array<{
    id: string;
    name: string;
    description: string;
    mastery: number;
    questionsTotal: number;
    questionsAnswered: number;
    studied: boolean;
    subtopics: string[];
  }>;
  videos: Array<{
    title: string;
    channel: string;
    duration: string;
    url: string;
    watched: boolean;
  }>;
}> = {
  matematica: {
    name: "Matemática",
    topics: [
      {
        id: "1",
        name: "Fundamentos da Matemática",
        description: "Frações, potenciação, radiciação e operações básicas",
        mastery: 85,
        questionsTotal: 30,
        questionsAnswered: 25,
        studied: true,
        subtopics: ["Frações", "MMC e MDC", "Potenciação e Radiciação"],
      },
      {
        id: "2",
        name: "Razão, Proporção e Regra de 3",
        description: "Grandezas proporcionais, regra de três simples e composta",
        mastery: 70,
        questionsTotal: 25,
        questionsAnswered: 18,
        studied: true,
        subtopics: ["Razão e Proporção", "Regra de 3 Simples", "Regra de 3 Composta"],
      },
      {
        id: "3",
        name: "Porcentagem e Matemática Financeira",
        description: "Descontos, acréscimos, juros simples e compostos",
        mastery: 55,
        questionsTotal: 20,
        questionsAnswered: 12,
        studied: false,
        subtopics: ["Porcentagem", "Juros Simples", "Juros Compostos"],
      },
      {
        id: "4",
        name: "Estatística",
        description: "Média, mediana, moda e desvio padrão",
        mastery: 40,
        questionsTotal: 20,
        questionsAnswered: 8,
        studied: false,
        subtopics: ["Média Aritmética", "Mediana e Moda", "Desvio Padrão"],
      },
      {
        id: "5",
        name: "Funções",
        description: "Função do 1° e 2° grau, exponencial e logarítmica",
        mastery: 30,
        questionsTotal: 35,
        questionsAnswered: 10,
        studied: false,
        subtopics: ["Função do 1° Grau", "Função do 2° Grau", "Função Exponencial", "Função Logarítmica"],
      },
      {
        id: "6",
        name: "Geometria Plana",
        description: "Áreas, perímetros e relações geométricas",
        mastery: 45,
        questionsTotal: 25,
        questionsAnswered: 12,
        studied: false,
        subtopics: ["Triângulos", "Quadriláteros", "Círculos"],
      },
      {
        id: "7",
        name: "Trigonometria",
        description: "Seno, cosseno, tangente e funções trigonométricas",
        mastery: 20,
        questionsTotal: 20,
        questionsAnswered: 4,
        studied: false,
        subtopics: ["Razões Trigonométricas", "Ciclo Trigonométrico", "Funções Trigonométricas"],
      },
      {
        id: "8",
        name: "Geometria Espacial",
        description: "Prismas, pirâmides, cones, cilindros e esferas",
        mastery: 15,
        questionsTotal: 20,
        questionsAnswered: 3,
        studied: false,
        subtopics: ["Prismas e Cilindros", "Pirâmides e Cones", "Esferas"],
      },
      {
        id: "9",
        name: "Análise Combinatória e Probabilidade",
        description: "Permutações, combinações, arranjos e probabilidade",
        mastery: 25,
        questionsTotal: 25,
        questionsAnswered: 6,
        studied: false,
        subtopics: ["Princípio Fundamental", "Combinações e Arranjos", "Probabilidade"],
      },
    ],
    videos: [
      { title: "TABUADA para MEDICINA e ENEM", channel: "Pedro Assaad", duration: "45:20", url: "#", watched: true },
      { title: "PORCENTAGEM para ENEM MEDICINA", channel: "Pedro Assaad", duration: "38:15", url: "#", watched: true },
      { title: "Fundamentos de Matemática Financeira", channel: "Pedro Assaad", duration: "42:30", url: "#", watched: false },
      { title: "TUDO de SISTEMAS para o ENEM 2026", channel: "Pedro Assaad", duration: "55:00", url: "#", watched: false },
      { title: "Tudo de ESCALAS para o ENEM 2026", channel: "Pedro Assaad", duration: "30:10", url: "#", watched: false },
      { title: "TUDO de ANÁLISE COMBINATÓRIA", channel: "Pedro Assaad", duration: "1:02:45", url: "#", watched: false },
      { title: "TODA A MATEMÁTICA DO ENEM EM 12 HORAS", channel: "Pedro Assaad", duration: "12:00:00", url: "#", watched: false },
      { title: "TUDO de Matemática do Ensino FUNDAMENTAL", channel: "Pedro Assaad", duration: "3:45:00", url: "#", watched: false },
    ],
  },
  fisica: {
    name: "Física",
    topics: [
      { id: "1", name: "Energia e Transformações", description: "Conservação de energia, cinética e potencial", mastery: 60, questionsTotal: 25, questionsAnswered: 15, studied: true, subtopics: ["Energia Cinética", "Energia Potencial", "Conservação"] },
      { id: "2", name: "Cinemática", description: "MRU, MRUV, gráficos de movimento", mastery: 50, questionsTotal: 30, questionsAnswered: 15, studied: true, subtopics: ["MRU", "MRUV", "Queda Livre"] },
      { id: "3", name: "Dinâmica", description: "Leis de Newton, força, aceleração", mastery: 35, questionsTotal: 25, questionsAnswered: 9, studied: false, subtopics: ["1ª Lei de Newton", "2ª Lei de Newton", "3ª Lei de Newton"] },
      { id: "4", name: "Termologia", description: "Calor, temperatura, termodinâmica", mastery: 25, questionsTotal: 20, questionsAnswered: 5, studied: false, subtopics: ["Calorimetria", "Dilatação", "Termodinâmica"] },
      { id: "5", name: "Eletrodinâmica", description: "Corrente, resistência, circuitos", mastery: 20, questionsTotal: 25, questionsAnswered: 5, studied: false, subtopics: ["Lei de Ohm", "Circuitos", "Potência Elétrica"] },
    ],
    videos: [
      { title: "LEIS DE NEWTON - porém irá mudar a sua vida", channel: "Pedro Assaad", duration: "48:30", url: "#", watched: false },
      { title: "Revisão de Termologia ENEM 2026", channel: "Pedro Assaad", duration: "55:00", url: "#", watched: false },
      { title: "Curso completo de CINEMÁTICA pro ENEM 2026", channel: "Pedro Assaad", duration: "1:30:00", url: "#", watched: false },
      { title: "Fundamentos de ELETRODINÂMICA", channel: "Pedro Assaad", duration: "42:00", url: "#", watched: false },
      { title: "TODA A FÍSICA DO ENEM 2026 em 12 horas", channel: "Pedro Assaad", duration: "12:00:00", url: "#", watched: false },
    ],
  },
};

// Default data for subjects not explicitly defined
const defaultSubjectData = {
  name: "Matéria",
  topics: [
    { id: "1", name: "Introdução", description: "Conceitos fundamentais", mastery: 30, questionsTotal: 15, questionsAnswered: 5, studied: false, subtopics: ["Conceito 1", "Conceito 2", "Conceito 3"] },
    { id: "2", name: "Desenvolvimento", description: "Tópicos intermediários", mastery: 15, questionsTotal: 20, questionsAnswered: 3, studied: false, subtopics: ["Tópico 1", "Tópico 2", "Tópico 3"] },
    { id: "3", name: "Aprofundamento", description: "Tópicos avançados", mastery: 5, questionsTotal: 20, questionsAnswered: 1, studied: false, subtopics: ["Avançado 1", "Avançado 2"] },
  ],
  videos: [
    { title: "Aula introdutória", channel: "Descomplica", duration: "30:00", url: "#", watched: false },
  ],
};

export default function SubjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("conteudos");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const data = subjectData[slug] ?? { ...defaultSubjectData, name: slug.charAt(0).toUpperCase() + slug.slice(1) };
  const color = getSubjectColor(slug);

  const overallMastery = data.topics.length > 0
    ? data.topics.reduce((sum, t) => sum + t.mastery, 0) / data.topics.length
    : 0;

  const totalQuestions = data.topics.reduce((sum, t) => sum + t.questionsTotal, 0);
  const totalAnswered = data.topics.reduce((sum, t) => sum + t.questionsAnswered, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/subjects">
          <motion.div
            whileHover={{ x: -3 }}
            className="p-2 rounded-xl bg-background-card border border-border text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.div>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold" style={{ color }}>
            {data.name}
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            {totalAnswered} de {totalQuestions} questões resolvidas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-mono font-bold" style={{ color }}>
              {Math.round(overallMastery)}%
            </p>
            <p className="text-xs text-foreground-muted">Domínio</p>
          </div>
          <Link href={`/practice?subject=${slug}`}>
            <GlowButton glowColor={color}>
              <Zap className="w-4 h-4" />
              Praticar
            </GlowButton>
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <AnimatedProgress value={overallMastery} color={color} height="md" showLabel />

      {/* Tabs */}
      <div className="flex gap-1 bg-background-card/50 rounded-xl p-1 border border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-background-elevated text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
              style={isActive ? { boxShadow: `0 0 15px ${color}22` } : undefined}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "conteudos" && (
          <motion.div
            key="conteudos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {data.topics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard
                  variant="interactive"
                  className="!p-0 overflow-hidden"
                  noPadding
                  onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <button className="flex-shrink-0">
                        {topic.studied ? (
                          <CheckCircle2 className="w-5 h-5" style={{ color }} />
                        ) : (
                          <Circle className="w-5 h-5 text-foreground-muted" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{topic.name}</h3>
                          <Badge
                            variant="custom"
                            color={
                              topic.mastery >= 75
                                ? "#FFD600"
                                : topic.mastery >= 50
                                ? "#FF9100"
                                : topic.mastery >= 25
                                ? "#42A5F5"
                                : "#8888AA"
                            }
                          >
                            {topic.mastery >= 75
                              ? "Mestre"
                              : topic.mastery >= 50
                              ? "Avançado"
                              : topic.mastery >= 25
                              ? "Intermediário"
                              : "Iniciante"}
                          </Badge>
                        </div>
                        <p className="text-xs text-foreground-muted mt-0.5">
                          {topic.description}
                        </p>
                        <div className="mt-2">
                          <AnimatedProgress
                            value={topic.mastery}
                            color={color}
                            height="sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-foreground-muted font-mono">
                          {topic.questionsAnswered}/{topic.questionsTotal}
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 text-foreground-muted transition-transform",
                            expandedTopic === topic.id && "rotate-90"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedTopic === topic.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border overflow-hidden"
                      >
                        <div className="p-4 pl-12 space-y-2">
                          {topic.subtopics.map((sub, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 text-sm text-foreground-muted"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              {sub}
                            </div>
                          ))}
                          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                            <Link href={`/practice?subject=${slug}&topic=${topic.id}`}>
                              <GlowButton size="sm" glowColor={color}>
                                <Target className="w-3 h-3" />
                                Praticar
                              </GlowButton>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "exercicios" && (
          <motion.div
            key="exercicios"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <GlassCard>
              <div className="text-center py-8">
                <PlayCircle className="w-12 h-12 mx-auto mb-4" style={{ color }} />
                <h3 className="text-lg font-display font-bold mb-2">
                  Praticar {data.name}
                </h3>
                <p className="text-sm text-foreground-muted mb-4">
                  Escolha um modo de prática para começar
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Link href={`/practice?subject=${slug}&mode=free`}>
                    <GlowButton variant="outline">Estudo Livre</GlowButton>
                  </Link>
                  <Link href={`/practice?subject=${slug}&mode=review`}>
                    <GlowButton variant="secondary">Revisão de Erros</GlowButton>
                  </Link>
                  <Link href={`/practice?subject=${slug}&mode=marathon`}>
                    <GlowButton glowColor={color}>Maratona</GlowButton>
                  </Link>
                </div>
              </div>
            </GlassCard>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              <GlassCard className="text-center">
                <p className="text-2xl font-mono font-bold" style={{ color }}>
                  {totalAnswered}
                </p>
                <p className="text-xs text-foreground-muted mt-1">Resolvidas</p>
              </GlassCard>
              <GlassCard className="text-center">
                <p className="text-2xl font-mono font-bold text-accent-green">
                  {totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0}%
                </p>
                <p className="text-xs text-foreground-muted mt-1">Taxa de Acerto</p>
              </GlassCard>
              <GlassCard className="text-center">
                <p className="text-2xl font-mono font-bold text-accent-orange">
                  {totalQuestions - totalAnswered}
                </p>
                <p className="text-xs text-foreground-muted mt-1">Pendentes</p>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === "desempenho" && (
          <motion.div
            key="desempenho"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <GlassCard>
              <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color }} />
                Desempenho por Tópico
              </h3>
              <div className="space-y-4">
                {data.topics.map((topic) => (
                  <div key={topic.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{topic.name}</span>
                      <span className="text-xs font-mono text-foreground-muted">
                        {topic.mastery}%
                      </span>
                    </div>
                    <AnimatedProgress
                      value={topic.mastery}
                      color={color}
                      height="sm"
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-display font-bold mb-4">
                Pontos que Precisam de Atenção
              </h3>
              <div className="space-y-2">
                {data.topics
                  .filter((t) => t.mastery < 40)
                  .map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent-pink/5 border border-accent-pink/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-pink" />
                      <span className="text-sm flex-1">{topic.name}</span>
                      <span className="text-xs font-mono text-accent-pink">
                        {topic.mastery}%
                      </span>
                      <Link href={`/practice?subject=${slug}&topic=${topic.id}`}>
                        <GlowButton size="sm" variant="danger">
                          Reforçar
                        </GlowButton>
                      </Link>
                    </div>
                  ))}
                {data.topics.filter((t) => t.mastery < 40).length === 0 && (
                  <p className="text-sm text-foreground-muted text-center py-4">
                    Excelente! Nenhum ponto fraco identificado.
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === "videoaulas" && (
          <motion.div
            key="videoaulas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {data.videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard variant="interactive" className="group">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}22` }}
                    >
                      <Video className="w-6 h-6" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent-purple transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-foreground-muted mt-1">
                        {video.channel} • {video.duration}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {video.watched && (
                          <Badge variant="success" size="sm">
                            Assistido
                          </Badge>
                        )}
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                        >
                          Assistir <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
