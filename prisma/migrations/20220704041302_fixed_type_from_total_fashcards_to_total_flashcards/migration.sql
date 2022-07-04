/*
  Warnings:

  - You are about to drop the column `totalFashcards` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalFashcards",
ADD COLUMN     "totalFlashcards" INTEGER NOT NULL DEFAULT 0;
