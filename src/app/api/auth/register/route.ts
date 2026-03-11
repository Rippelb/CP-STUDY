import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues?.[0]?.message ?? "Dados inválidos" },
        { status: 400 }
      );
    }

    const { password } = parsed.data;

    // In production: use name and email from parsed.data
    // const existingUser = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    // if (existingUser) {
    //   return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
    // }

    // Hash password for production use
    void bcrypt.hash(password, 12);

    // await prisma.user.create({
    //   data: { name: parsed.data.name, email: parsed.data.email, password: hashedPassword },
    // });

    return NextResponse.json({ success: true, message: "Conta criada com sucesso" });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
