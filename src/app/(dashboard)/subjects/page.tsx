"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Landmark,
  Globe,
  Brain,
  Users,
  BookOpen,
  PenTool,
  Languages,
  Atom,
  FlaskConical,
  Dna,
  Calculator,
  type LucideIcon,
  GraduationCap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Subject {
  name: string;
  slug: string;
  color: string;
  icon: LucideIcon;
  solved: number;
  total: number;
  mastery: number; // 0-100
}

interface Area {
  name: string;
  subjects: Subject[];
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const areas: Area[] = [
  {
    name: "Ciências Humanas",
    subjects: [
      { name: "História", slug: "historia", color: "#FFD600", icon: Landmark, solved: 187, total: 420, mastery: 45 },
      { name: "Geografia", slug: "geografia", color: "#26A69A", icon: Globe, solved: 134, total: 380, mastery: 35 },
      { name: "Filosofia", slug: "filosofia", color: "#AB47BC", icon: Brain, solved: 89, total: 260, mastery: 34 },
      { name: "Sociologia", slug: "sociologia", color: "#EF5350", icon: Users, solved: 62, total: 240, mastery: 26 },
    ],
  },
  {
    name: "Linguagens",
    subjects: [
      { name: "Língua Portuguesa", slug: "portugues", color: "#FF9100", icon: BookOpen, solved: 213, total: 500, mastery: 43 },
      { name: "Redação", slug: "redacao", color: "#FF7043", icon: PenTool, solved: 28, total: 100, mastery: 28 },
      { name: "Língua Inglesa", slug: "ingles", color: "#42A5F5", icon: Languages, solved: 95, total: 200, mastery: 48 },
    ],
  },
  {
    name: "Ciências da Natureza",
    subjects: [
      { name: "Física", slug: "fisica", color: "#00D4FF", icon: Atom, solved: 156, total: 450, mastery: 35 },
      { name: "Química", slug: "quimica", color: "#FF6584", icon: FlaskConical, solved: 178, total: 400, mastery: 45 },
      { name: "Biologia", slug: "biologia", color: "#00E676", icon: Dna, solved: 201, total: 480, mastery: 42 },
    ],
  },
  {
    name: "Matemática",
    subjects: [
      { name: "Matemática", slug: "matematica", color: "#6C63FF", icon: Calculator, solved: 312, total: 600, mastery: 52 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMasteryBadge(mastery: number): { label: string; variant: "info" | "warning" | "success" | "danger" } {
  if (mastery >= 80) return { label: "Mestre", variant: "success" };
  if (mastery >= 55) return { label: "Avançado", variant: "info" };
  if (mastery >= 30) return { label: "Intermediário", variant: "warning" };
  return { label: "Iniciante", variant: "danger" };
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Subject Card
// ---------------------------------------------------------------------------

function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  const badge = getMasteryBadge(subject.mastery);
  const progressPercent = Math.round((subject.solved / subject.total) * 100);

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/subjects/${subject.slug}`} className="block group">
        <GlassCard
          variant="interactive"
          glowColor={subject.color}
          className={cn(
            "relative overflow-hidden h-full",
            "transition-all duration-300",
            "group-hover:scale-[1.03] group-hover:-translate-y-1",
          )}
          // Prevent GlassCard's own initial animation since we use parent stagger
          initial={false}
          animate={false}
          style={{
            boxShadow: `0 0 20px ${subject.color}22, inset 0 0 20px ${subject.color}08`,
          }}
          whileHover={{
            boxShadow: `0 0 36px ${subject.color}44, inset 0 0 28px ${subject.color}18`,
          }}
        >
          {/* Background glow orb */}
          <div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25 pointer-events-none"
            style={{ background: subject.color }}
          />

          {/* Header: icon + badge */}
          <div className="flex items-start justify-between mb-4">
            {/* Animated icon container */}
            <motion.div
              className="relative flex items-center justify-center w-12 h-12 rounded-xl"
              style={{
                background: `${subject.color}18`,
                boxShadow: `0 0 16px ${subject.color}22`,
              }}
              whileHover={{
                boxShadow: `0 0 28px ${subject.color}55`,
                scale: 1.1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon
                className="w-6 h-6 transition-colors duration-300"
                style={{ color: subject.color }}
                strokeWidth={2}
              />
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ border: `1.5px solid ${subject.color}33` }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <Badge variant={badge.variant} size="sm">
              {badge.label}
            </Badge>
          </div>

          {/* Subject name */}
          <h3 className="text-base font-display font-semibold text-foreground mb-3 tracking-tight">
            {subject.name}
          </h3>

          {/* Progress bar */}
          <AnimatedProgress
            value={progressPercent}
            color={subject.color}
            height="sm"
            showLabel
            className="mb-2"
          />

          {/* Stats */}
          <p className="text-xs font-body text-foreground-muted">
            <span className="font-semibold" style={{ color: subject.color }}>
              {subject.solved}
            </span>{" "}
            questões resolvidas /{" "}
            <span className="font-semibold text-foreground-secondary">
              {subject.total}
            </span>{" "}
            total
          </p>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SubjectsPage() {
  return (
    <motion.div
      className="space-y-10 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page header */}
      <motion.div variants={sectionVariants} className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-purple/15">
          <GraduationCap className="w-5 h-5 text-accent-purple" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
            Disciplinas
          </h1>
          <p className="text-sm font-body text-foreground-muted">
            Escolha uma disciplina para praticar e acompanhe seu progresso.
          </p>
        </div>
      </motion.div>

      {/* Area sections */}
      {areas.map((area) => (
        <motion.section key={area.name} variants={sectionVariants}>
          {/* Section header */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-foreground-muted whitespace-nowrap px-2">
              {area.name}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
          </div>

          {/* Subject cards grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={containerVariants}
          >
            {area.subjects.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </motion.div>
        </motion.section>
      ))}
    </motion.div>
  );
}
