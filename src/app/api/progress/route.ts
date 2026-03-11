import { NextRequest, NextResponse } from "next/server";

// Mock progress data
const mockProgress = [
  { subjectId: "1", subjectName: "Matemática", subjectSlug: "matematica", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "2", subjectName: "Física", subjectSlug: "fisica", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "3", subjectName: "Química", subjectSlug: "quimica", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "4", subjectName: "Biologia", subjectSlug: "biologia", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "5", subjectName: "Português", subjectSlug: "portugues", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "6", subjectName: "História", subjectSlug: "historia", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "7", subjectName: "Geografia", subjectSlug: "geografia", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "8", subjectName: "Filosofia", subjectSlug: "filosofia", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "9", subjectName: "Sociologia", subjectSlug: "sociologia", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "10", subjectName: "Redação", subjectSlug: "redacao", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
  { subjectId: "11", subjectName: "Língua Inglesa", subjectSlug: "ingles", mastery: 0, totalAnswered: 0, totalCorrect: 0, accuracy: 0 },
];

export async function GET() {
  return NextResponse.json({ progress: mockProgress });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { xp } = body;

    // In production: update user XP in database
    return NextResponse.json({ success: true, xp });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar progresso" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "study") {
      // In production: check and update streak
      return NextResponse.json({ streak: 0, updated: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar" },
      { status: 500 }
    );
  }
}
