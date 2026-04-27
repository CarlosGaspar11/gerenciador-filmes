import { listarFilmes } from "@/lib/storage";
import { ClientPage } from "@/components/ClientPage";

export default async function Home() {
  const filmes = await listarFilmes();
  return <ClientPage filmesIniciais={filmes} />;
}
