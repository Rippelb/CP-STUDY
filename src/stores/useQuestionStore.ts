import { create } from "zustand";

interface QuestionOption {
  id: string;
  letter: string;
  content: string;
  isCorrect: boolean;
  explanation: string | null;
}

interface Question {
  id: string;
  content: string;
  imageUrl: string | null;
  source: string;
  year: number;
  difficulty: string;
  topicId: string;
  subjectId: string;
  options: QuestionOption[];
  subject?: { name: string; slug: string; color: string };
  topic?: { name: string };
}

type PracticeMode = "free" | "simulado" | "review" | "marathon";

interface QuestionStore {
  questions: Question[];
  currentIndex: number;
  selectedOption: string | null;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  combo: number;
  totalCorrect: number;
  totalAnswered: number;
  xpEarned: number;
  mode: PracticeMode;
  timeRemaining: number | null;
  sessionStarted: boolean;
  sessionFinished: boolean;

  setQuestions: (questions: Question[]) => void;
  selectOption: (optionId: string) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetSession: () => void;
  setMode: (mode: PracticeMode) => void;
  setTimeRemaining: (time: number | null) => void;
  finishSession: () => void;
  startSession: () => void;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedOption: null,
  hasAnswered: false,
  isCorrect: null,
  combo: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  xpEarned: 0,
  mode: "free",
  timeRemaining: null,
  sessionStarted: false,
  sessionFinished: false,

  setQuestions: (questions) => set({ questions, currentIndex: 0 }),

  selectOption: (optionId) => {
    const { hasAnswered } = get();
    if (hasAnswered) return;
    set({ selectedOption: optionId });
  },

  submitAnswer: () => {
    const { questions, currentIndex, selectedOption, combo, mode } = get();
    if (!selectedOption) return;

    const question = questions[currentIndex];
    const option = question.options.find((o) => o.id === selectedOption);
    if (!option) return;

    const isCorrect = option.isCorrect;
    const newCombo = isCorrect ? combo + 1 : 0;

    // Calculate XP
    let xp = 0;
    if (isCorrect) {
      const baseXp: Record<string, number> = { easy: 10, medium: 20, hard: 35 };
      xp = baseXp[question.difficulty] ?? 10;
      if (newCombo >= 10) xp = Math.round(xp * 3);
      else if (newCombo >= 5) xp = Math.round(xp * 2);
      else if (newCombo >= 3) xp = Math.round(xp * 1.5);
    }

    set((state) => ({
      hasAnswered: true,
      isCorrect,
      combo: newCombo,
      totalCorrect: state.totalCorrect + (isCorrect ? 1 : 0),
      totalAnswered: state.totalAnswered + 1,
      xpEarned: mode !== "simulado" ? state.xpEarned + xp : state.xpEarned,
    }));
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex >= questions.length - 1) {
      set({ sessionFinished: true });
      return;
    }
    set({
      currentIndex: currentIndex + 1,
      selectedOption: null,
      hasAnswered: false,
      isCorrect: null,
    });
  },

  resetSession: () =>
    set({
      currentIndex: 0,
      selectedOption: null,
      hasAnswered: false,
      isCorrect: null,
      combo: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      xpEarned: 0,
      timeRemaining: null,
      sessionStarted: false,
      sessionFinished: false,
    }),

  setMode: (mode) => set({ mode }),
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
  finishSession: () => set({ sessionFinished: true }),
  startSession: () => set({ sessionStarted: true }),
}));
