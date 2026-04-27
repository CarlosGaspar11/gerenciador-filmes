import { NextResponse } from "next/server";
import { listarFilmes, salvarFilme } from "@/lib/storage";

export async function GET() {
  const filmes = await listarFilmes();
  return NextResponse.json(filmes);
}

export async function POST(req: Request) {
  const filme = await req.json();
  const salvo = await salvarFilme(filme);
  if (!salvo) return NextResponse.json({ error: "Já existe" }, { status: 409 });
  return NextResponse.json({ ok: true });
}
