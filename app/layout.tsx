import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de Filmes",
  description: "Salve e organize seus filmes favoritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-xl font-bold">Gerenciador de Filmes</h1>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
