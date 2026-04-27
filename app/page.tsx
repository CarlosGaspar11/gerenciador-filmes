import { listarFilmes } from "@/lib/storage";
import { ClientPage } from "@/components/ClientPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const filmes = session?.user?.email
    ? await listarFilmes(session.user.email)
    : [];

  return <ClientPage filmesIniciais={filmes} logado={!!session} />;
}
