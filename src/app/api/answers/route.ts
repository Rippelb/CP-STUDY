import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { xpEarned, combo } = body;

    // In production: save to database via Prisma
    // const { questionId, optionId, isCorrect, timeSpent } = body;
    // await prisma.answer.create({ data: { ... } });

    return NextResponse.json({
      success: true,
      xpEarned: xpEarned ?? 0,
      combo: combo ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao salvar resposta" },
      { status: 500 }
    );
  }
}
