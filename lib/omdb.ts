import { Filme } from "./types";

export async function buscarFilmes(titulo: string): Promise<Filme[]> {
  const key = process.env.NEXT_PUBLIC_OMDB_KEY;
  if (!titulo.trim()) return [];

  try {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(titulo)}&apikey=${key}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    if (data.Response === "False") return [];

    return data.Search.map((item: any) => ({
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      poster: item.Poster !== "N/A" ? item.Poster : "/no-poster.png",
      genre: "",
      plot: "",
      status: "pendente" as const,
      savedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}

export async function buscarDetalhes(imdbID: string): Promise<Filme | null> {
  const key = process.env.NEXT_PUBLIC_OMDB_KEY;

  try {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${key}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    if (data.Response === "False") return null;

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster !== "N/A" ? data.Poster : "/no-poster.png",
      genre: data.Genre,
      plot: data.Plot,
      status: "pendente" as const,
      savedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
    return null;
  }
}
