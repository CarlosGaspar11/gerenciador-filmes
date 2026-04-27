import { prisma } from "./prisma";
import { Filme } from "./types";

export async function listarFilmes(): Promise<Filme[]> {
  const filmes = await prisma.filme.findMany({
    orderBy: { savedAt: "desc" },
  });
  return filmes.map((f) => ({
    ...f,
    status: f.status as "assistido" | "pendente",
  }));
}

export async function salvarFilme(filme: Filme): Promise<boolean> {
  const existe = await prisma.filme.findUnique({
    where: { id: filme.id },
  });
  if (existe) return false;
  await prisma.filme.create({ data: filme });
  return true;
}

export async function removerFilme(id: string): Promise<void> {
  await prisma.filme.delete({ where: { id } });
}

export async function toggleStatus(id: string): Promise<void> {
  const filme = await prisma.filme.findUnique({ where: { id } });
  if (!filme) return;
  await prisma.filme.update({
    where: { id },
    data: {
      status: filme.status === "assistido" ? "pendente" : "assistido",
    },
  });
}
