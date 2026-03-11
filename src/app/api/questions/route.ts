import { NextRequest, NextResponse } from "next/server";

// Mock questions data (in production, fetch from Prisma)
const questions = [
  {
    id: "q1",
    content: "Uma pesquisa de mercado revelou que 60% dos entrevistados preferem o produto A, 45% preferem o produto B e 25% preferem ambos. Qual a porcentagem de entrevistados que prefere pelo menos um dos produtos?",
    source: "ENEM",
    year: 2023,
    difficulty: "medium",
    subjectSlug: "matematica",
    topicName: "Conjuntos",
    options: [
      { id: "o1", letter: "A", content: "70%", isCorrect: false },
      { id: "o2", letter: "B", content: "75%", isCorrect: false },
      { id: "o3", letter: "C", content: "80%", isCorrect: true, explanation: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 60% + 45% - 25% = 80%." },
      { id: "o4", letter: "D", content: "85%", isCorrect: false },
      { id: "o5", letter: "E", content: "90%", isCorrect: false },
    ],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const difficulty = searchParams.get("difficulty");
  const source = searchParams.get("source");
  const limit = parseInt(searchParams.get("limit") ?? "10");

  let filtered = [...questions];

  if (subject) {
    filtered = filtered.filter((q) => q.subjectSlug === subject);
  }
  if (difficulty) {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }
  if (source) {
    filtered = filtered.filter((q) => q.source === source);
  }

  return NextResponse.json({
    questions: filtered.slice(0, limit),
    total: filtered.length,
  });
}
