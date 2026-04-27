/*
  Warnings:

  - Added the required column `userId` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Filme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "savedAt" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Filme" ("genre", "id", "plot", "poster", "savedAt", "status", "title", "year") SELECT "genre", "id", "plot", "poster", "savedAt", "status", "title", "year" FROM "Filme";
DROP TABLE "Filme";
ALTER TABLE "new_Filme" RENAME TO "Filme";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
