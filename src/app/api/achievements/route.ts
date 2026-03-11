import { NextResponse } from "next/server";

const achievements = [
  { id: "1", name: "Primeira Questão", description: "Respondeu sua primeira questão", icon: "Star", category: "study", rarity: "common", xpReward: 50, unlocked: true },
  { id: "2", name: "Foco Total", description: "Estudou por 1 hora seguida", icon: "Clock", category: "study", rarity: "common", xpReward: 75, unlocked: true },
  { id: "3", name: "Streak Iniciante", description: "3 dias consecutivos estudando", icon: "Flame", category: "streak", rarity: "common", xpReward: 100, unlocked: true },
];

export async function GET() {
  return NextResponse.json({ achievements });
}
