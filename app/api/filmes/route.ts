import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listarFilmes, salvarFilme } from "@/lib/storage";
import { FilmeSchema } from "@/lib/validations";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const filmes = await listarFilmes(session.user.email);
  return NextResponse.json(filmes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const resultado = FilmeSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { error: "Dados inválidos", detalhes: resultado.error.flatten() },
      { status: 400 },
    );
  }

  const salvo = await salvarFilme(resultado.data, session.user.email);
  if (!salvo) return NextResponse.json({ error: "Já existe" }, { status: 409 });
  return NextResponse.json({ ok: true });
}
