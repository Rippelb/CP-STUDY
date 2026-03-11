export const LEVEL_NAMES = [
  "Calouro",
  "Estudante",
  "Dedicado",
  "Aplicado",
  "Veterano",
  "Monitor",
  "Especialista",
  "Mestrando",
  "Doutorando",
  "Professor",
  "Gênio",
  "Lenda",
] as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "#00E676",
  medium: "#FF9100",
  hard: "#FF6584",
};

export const MASTERY_BADGES = [
  { min: 0, max: 25, label: "Iniciante", color: "#8888AA" },
  { min: 25, max: 50, label: "Intermediário", color: "#42A5F5" },
  { min: 50, max: 75, label: "Avançado", color: "#FF9100" },
  { min: 75, max: 100, label: "Mestre", color: "#FFD600" },
] as const;

export const EXAM_SOURCES = [
  "ENEM",
  "UFRGS",
  "FUVEST",
  "UNICAMP",
  "ORIGINAL",
] as const;

export const SUBJECT_AREAS = {
  humanas: {
    name: "Ciências Humanas",
    color: "#FFD600",
  },
  linguagens: {
    name: "Linguagens",
    color: "#FF9100",
  },
  natureza: {
    name: "Ciências da Natureza",
    color: "#00E676",
  },
  matematica: {
    name: "Matemática",
    color: "#6C63FF",
  },
} as const;

export const PRACTICE_MODES = {
  free: {
    name: "Estudo Livre",
    description: "Sem tempo, com gabarito na hora",
    icon: "BookOpen",
    color: "#6C63FF",
  },
  simulado: {
    name: "Simulado",
    description: "Com tempo cronometrado, gabarito só no final",
    icon: "Clock",
    color: "#00D4FF",
  },
  review: {
    name: "Revisão de Erros",
    description: "Só questões que você errou antes",
    icon: "RotateCcw",
    color: "#FF6584",
  },
  marathon: {
    name: "Maratona",
    description: "Sequência infinita com contador de acertos",
    icon: "Flame",
    color: "#FF9100",
  },
} as const;

export const ENEM_DATE = new Date("2026-11-08");
