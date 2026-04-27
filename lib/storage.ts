import { prisma } from "./prisma";
import { Filme } from "./types";

export async function listarFilmes(userId: string): Promise<Filme[]> {
  const filmes = await prisma.filme.findMany({
    where: { userId },
    orderBy: { savedAt: "desc" },
  });
  return filmes.map((f) => ({
    ...f,
    status: f.status as "assistido" | "pendente",
  }));
}

export async function salvarFilme(
  filme: Filme,
  userId: string,
): Promise<boolean> {
  const existe = await prisma.filme.findFirst({
    where: { id: filme.id, userId },
  });
  if (existe) return false;
  await prisma.filme.create({ data: { ...filme, userId } });
  return true;
}

export async function removerFilme(id: string, userId: string): Promise<void> {
  await prisma.filme.deleteMany({ where: { id, userId } });
}

export async function toggleStatus(id: string, userId: string): Promise<void> {
  const filme = await prisma.filme.findFirst({ where: { id, userId } });
  if (!filme) return;
  await prisma.filme.update({
    where: { id },
    data: {
      status: filme.status === "assistido" ? "pendente" : "assistido",
    },
  });
}
