import { NextResponse } from "next/server";
import { removerFilme, toggleStatus } from "@/lib/storage";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  await removerFilme(params.id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } },
) {
  await toggleStatus(params.id);
  return NextResponse.json({ ok: true });
}
