import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { removerFilme, toggleStatus } from "@/lib/storage";
import { z } from "zod";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const resultado = ParamsSchema.safeParse({ id });
  if (!resultado.success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  await removerFilme(id, session.user.email);
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const resultado = ParamsSchema.safeParse({ id });
  if (!resultado.success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  await toggleStatus(id, session.user.email);
  return NextResponse.json({ ok: true });
}
