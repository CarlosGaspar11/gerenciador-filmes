"use client";
import { useState, useMemo } from "react";
import { Filme } from "@/lib/types";
import { MovieCard } from "./MovieCard";
import { Button } from "@/components/ui/button";

type Filtro = "todos" | "assistido" | "pendente";

interface Props {
  filmes: Filme[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function MovieList({ filmes, onRemove, onToggle }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const filtrados = useMemo(
    () =>
      filtro === "todos" ? filmes : filmes.filter((f) => f.status === filtro),
    [filmes, filtro],
  );

  const assistidos = filmes.filter((f) => f.status === "assistido").length;

  const filtros = [
    { label: "Todos", value: "todos" },
    { label: "Assistidos", value: "assistido" },
    { label: "Pendentes", value: "pendente" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filmes.length} filmes • {assistidos} assistidos
        </p>
        <div className="flex gap-2">
          {filtros.map((f) => (
            <Button
              key={f.value}
              size="sm"
              variant={filtro === f.value ? "default" : "outline"}
              onClick={() => setFiltro(f.value as Filtro)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtrados.map((f) => (
          <MovieCard
            key={f.id}
            filme={f}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
