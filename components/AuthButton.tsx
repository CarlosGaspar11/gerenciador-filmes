"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {session.user?.name}
        </span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" onClick={() => signIn("github")}>
      Entrar com GitHub
    </Button>
  );
}
