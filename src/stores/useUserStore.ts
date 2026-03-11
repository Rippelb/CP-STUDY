import { create } from "zustand";

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  streakShields: number;
  lastStudyDate: string | null;
  targetExam: string;
  examDate: string | null;
}

interface UserStore {
  user: UserData | null;
  isLoading: boolean;
  setUser: (user: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  addXp: (amount: number) => void;
  updateStreak: (streak: number) => void;
  updateLevel: (level: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  addXp: (amount) =>
    set((state) => ({
      user: state.user ? { ...state.user, xp: state.user.xp + amount } : null,
    })),
  updateStreak: (streak) =>
    set((state) => ({
      user: state.user ? { ...state.user, streak } : null,
    })),
  updateLevel: (level) =>
    set((state) => ({
      user: state.user ? { ...state.user, level } : null,
    })),
}));
