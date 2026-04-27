"use client";
import { useState } from "react";
import { Filme } from "@/lib/types";
import { buscarDetalhes } from "@/lib/omdb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  filmes: Filme[];
  onSalvar: (filme: Filme) => void;
}

export function MovieResult({ filmes, onSalvar }: Props) {
  const [selecionado, setSelecionado] = useState<Filme | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleClick(filme: Filme) {
    setLoadingId(filme.id);
    const detalhes = await buscarDetalhes(filme.id);
    setSelecionado(detalhes);
    setLoadingId(null);
  }

  if (filmes.length === 0) return null;

  return (
    <>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {filmes.map((filme) => (
          <div
            key={filme.id}
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-200"
            onClick={() => handleClick(filme)}
          >
            <Card className="flex flex-col overflow-hidden">
              {loadingId === filme.id ? (
                <Skeleton className="w-full aspect-[2/3]" />
              ) : (
                <img
                  src={filme.poster}
                  alt={filme.title}
                  className="w-full object-cover aspect-[2/3]"
                />
              )}
              <CardContent className="p-2 flex flex-col gap-2">
                <p className="text-xs font-semibold truncate">{filme.title}</p>
                <p className="text-xs text-muted-foreground">{filme.year}</p>
                <Button
                  size="sm"
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSalvar(filme);
                  }}
                >
                  Salvar
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {selecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelecionado(null)}
        >
          <div
            className="bg-background rounded-xl shadow-lg max-w-lg w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 p-4">
              <img
                src={selecionado.poster}
                alt={selecionado.title}
                className="h-48 w-32 object-cover rounded-lg shrink-0"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{selecionado.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selecionado.year}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selecionado.genre}
                </p>
                <p className="text-sm overflow-y-auto max-h-32">
                  {selecionado.plot}
                </p>
              </div>
            </div>
            <div className="flex gap-2 p-4 pt-0">
              <Button
                className="flex-1"
                onClick={() => {
                  onSalvar(selecionado);
                  setSelecionado(null);
                }}
              >
                Salvar na lista
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSelecionado(null)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
