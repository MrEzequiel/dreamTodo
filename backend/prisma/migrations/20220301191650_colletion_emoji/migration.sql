/*
  Warnings:

  - Added the required column `emoji` to the `colletions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colletions" ADD COLUMN     "emoji" TEXT NOT NULL;
