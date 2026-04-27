"use client";
import { useState } from "react";
import { Filme } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  filme: Filme;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function MovieCard({ filme, onRemove, onToggle }: Props) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Card className="flex flex-col">
        <img
          src={filme.poster}
          alt={filme.title}
          className="w-full object-cover rounded-t-lg aspect-[2/3] cursor-pointer hover:-translate-y-1 transition-transform duration-200"
          onClick={() => setModalAberto(true)}
        />
        <CardContent className="flex flex-col flex-1 gap-2 p-3">
          <h3 className="font-semibold text-sm leading-tight">{filme.title}</h3>
          <p className="text-xs text-muted-foreground">
            {filme.year} • {filme.genre}
          </p>
          <Badge
            variant={filme.status === "assistido" ? "default" : "secondary"}
            className="w-fit"
          >
            {filme.status === "assistido" ? "Assistido" : "Pendente"}
          </Badge>
          <div className="flex gap-2 mt-auto">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => onToggle(filme.id)}
            >
              {filme.status === "assistido"
                ? "Marcar pendente"
                : "Marcar assistido"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="text-xs"
              onClick={() => onRemove(filme.id)}
            >
              Remover
            </Button>
          </div>
        </CardContent>
      </Card>

      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="bg-background rounded-xl shadow-lg max-w-lg w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 p-4">
              <img
                src={filme.poster}
                alt={filme.title}
                className="h-48 w-32 object-cover rounded-lg shrink-0"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{filme.title}</h3>
                <p className="text-sm text-muted-foreground">{filme.year}</p>
                <p className="text-sm text-muted-foreground">{filme.genre}</p>
                <p className="text-sm overflow-y-auto max-h-32">{filme.plot}</p>
                <Badge
                  variant={
                    filme.status === "assistido" ? "default" : "secondary"
                  }
                  className="w-fit"
                >
                  {filme.status === "assistido" ? "Assistido" : "Pendente"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 p-4 pt-0">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  onToggle(filme.id);
                  setModalAberto(false);
                }}
              >
                {filme.status === "assistido"
                  ? "Marcar pendente"
                  : "Marcar assistido"}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  onRemove(filme.id);
                  setModalAberto(false);
                }}
              >
                Remover
              </Button>
              <Button variant="secondary" onClick={() => setModalAberto(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
