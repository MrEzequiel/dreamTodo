/*
  Warnings:

  - Added the required column `modified_at` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "modified_at" TIMESTAMP(3) NOT NULL;
