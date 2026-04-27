-- CreateTable
CREATE TABLE "Filme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "savedAt" TEXT NOT NULL
);
