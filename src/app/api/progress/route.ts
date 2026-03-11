import { NextRequest, NextResponse } from "next/server";

// Mock progress data
const mockProgress = [
  { subjectId: "1", subjectName: "Matemática", subjectSlug: "matematica", mastery: 45, totalAnswered: 89, totalCorrect: 65, accuracy: 73 },
  { subjectId: "2", subjectName: "Física", subjectSlug: "fisica", mastery: 35, totalAnswered: 42, totalCorrect: 30, accuracy: 71 },
  { subjectId: "3", subjectName: "Química", subjectSlug: "quimica", mastery: 28, totalAnswered: 35, totalCorrect: 22, accuracy: 63 },
  { subjectId: "4", subjectName: "Biologia", subjectSlug: "biologia", mastery: 40, totalAnswered: 38, totalCorrect: 28, accuracy: 74 },
  { subjectId: "5", subjectName: "Português", subjectSlug: "portugues", mastery: 55, totalAnswered: 45, totalCorrect: 38, accuracy: 84 },
  { subjectId: "6", subjectName: "História", subjectSlug: "historia", mastery: 30, totalAnswered: 20, totalCorrect: 14, accuracy: 70 },
  { subjectId: "7", subjectName: "Geografia", subjectSlug: "geografia", mastery: 25, totalAnswered: 15, totalCorrect: 10, accuracy: 67 },
  { subjectId: "8", subjectName: "Filosofia", subjectSlug: "filosofia", mastery: 20, totalAnswered: 10, totalCorrect: 7, accuracy: 70 },
  { subjectId: "9", subjectName: "Sociologia", subjectSlug: "sociologia", mastery: 22, totalAnswered: 8, totalCorrect: 6, accuracy: 75 },
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
      return NextResponse.json({ streak: 5, updated: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar" },
      { status: 500 }
    );
  }
}
