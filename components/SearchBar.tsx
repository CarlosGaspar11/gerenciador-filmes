"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { buscarFilmes } from "@/lib/omdb";
import { Filme } from "@/lib/types";

interface Props {
  onResult: (filmes: Filme[]) => void;
}

export function SearchBar({ onResult }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const resultados = await buscarFilmes(query);
    onResult(resultados);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Ex: Batman, Inception..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          disabled={loading}
        />
        <Button onClick={handleSearch} disabled={loading || !query.trim()}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>
      {loading && (
        <div className="flex gap-4">
          <Skeleton className="h-40 w-28" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
