"use client";
import { useState } from "react";
import { Filme } from "@/lib/types";
import { SearchBar } from "@/components/SearchBar";
import { MovieResult } from "@/components/MovieResult";
import { MovieList } from "@/components/MovieList";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  filmesIniciais: Filme[];
  logado: boolean;
}

export function ClientPage({ filmesIniciais, logado }: Props) {
  const [filmes, setFilmes] = useState<Filme[]>(filmesIniciais);
  const [resultados, setResultados] = useState<Filme[]>([]);
  const [mensagem, setMensagem] = useState("");

  async function recarregar() {
    const res = await fetch("/api/filmes");
    const data = await res.json();
    setFilmes(data);
  }

  const handleResult = (lista: Filme[]) => {
    if (lista.length === 0) return setMensagem("Nenhum filme encontrado.");
    setResultados(lista);
    setMensagem("");
  };

  const handleSalvar = async (filme: Filme) => {
    if (!logado) return setMensagem("Faça login para salvar filmes!");
    const res = await fetch("/api/filmes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filme),
    });
    if (res.status === 409) return setMensagem("Filme já está na lista!");
    setMensagem("");
    recarregar();
  };

  const handleRemove = async (id: string) => {
    await fetch(`/api/filmes/${id}`, { method: "DELETE" });
    recarregar();
  };

  const handleToggle = async (id: string) => {
    await fetch(`/api/filmes/${id}`, { method: "PATCH" });
    recarregar();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Buscar Filme</h2>
        <SearchBar onResult={handleResult} />
        {mensagem && (
          <Alert variant="destructive" className="mt-3">
            <AlertDescription>{mensagem}</AlertDescription>
          </Alert>
        )}
        {resultados.length > 0 && (
          <MovieResult filmes={resultados} onSalvar={handleSalvar} />
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Minha Lista</h2>
        {!logado ? (
          <p className="text-muted-foreground text-sm">
            Faça login para ver sua lista de filmes.
          </p>
        ) : (
          <MovieList
            filmes={filmes}
            onRemove={handleRemove}
            onToggle={handleToggle}
          />
        )}
      </section>
    </div>
  );
}
