import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listarFilmes, salvarFilme } from "@/lib/storage";

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
  const filme = await req.json();
  const salvo = await salvarFilme(filme, session.user.email);
  if (!salvo) return NextResponse.json({ error: "Já existe" }, { status: 409 });
  return NextResponse.json({ ok: true });
}
