import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function calculateLevel(xp: number): number {
  // Exponential curve: each level requires more XP
  // Level 1: 0 XP, Level 2: 100 XP, Level 3: 300 XP, etc.
  return Math.floor(0.5 + Math.sqrt(1 + 8 * xp / 100) / 2);
}

export function xpForLevel(level: number): number {
  return ((level - 1) * level * 100) / 2;
}

export function xpForNextLevel(currentXp: number): { current: number; needed: number; progress: number } {
  const level = calculateLevel(currentXp);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const xpInLevel = currentXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  return {
    current: xpInLevel,
    needed: xpNeeded,
    progress: (xpInLevel / xpNeeded) * 100,
  };
}

export function getLevelName(level: number): string {
  const names = [
    "Calouro",       // 1
    "Estudante",     // 2
    "Dedicado",      // 3
    "Aplicado",      // 4
    "Veterano",      // 5
    "Monitor",       // 6
    "Especialista",  // 7
    "Mestrando",     // 8
    "Doutorando",    // 9
    "Professor",     // 10
    "Gênio",         // 11
    "Lenda",         // 12+
  ];
  return names[Math.min(level - 1, names.length - 1)] ?? "Lenda";
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "Boa madrugada";
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function daysUntilExam(examDate?: Date | null): number | null {
  if (!examDate) return null;
  const now = new Date();
  const diff = examDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculateXpForAnswer(
  difficulty: string,
  isCorrect: boolean,
  combo: number
): number {
  if (!isCorrect) return 0;

  const baseXp: Record<string, number> = {
    easy: 10,
    medium: 20,
    hard: 35,
  };

  const base = baseXp[difficulty] ?? 10;

  // Combo multiplier
  let multiplier = 1;
  if (combo >= 10) multiplier = 3;
  else if (combo >= 5) multiplier = 2;
  else if (combo >= 3) multiplier = 1.5;

  return Math.round(base * multiplier);
}

export function getSubjectColor(slug: string): string {
  const colors: Record<string, string> = {
    matematica: "#6C63FF",
    fisica: "#00D4FF",
    quimica: "#FF6584",
    biologia: "#00E676",
    portugues: "#FF9100",
    historia: "#FFD600",
    geografia: "#26A69A",
    filosofia: "#AB47BC",
    sociologia: "#EF5350",
    ingles: "#42A5F5",
    redacao: "#FF7043",
    artes: "#EC407A",
  };
  return colors[slug] ?? "#6C63FF";
}

export function getSubjectIcon(slug: string): string {
  const icons: Record<string, string> = {
    matematica: "Calculator",
    fisica: "Atom",
    quimica: "FlaskConical",
    biologia: "Dna",
    portugues: "BookOpen",
    historia: "Landmark",
    geografia: "Globe",
    filosofia: "Brain",
    sociologia: "Users",
    ingles: "Languages",
    redacao: "PenTool",
    artes: "Palette",
  };
  return icons[slug] ?? "BookOpen";
}
