/*
  Warnings:

  - You are about to drop the column `isChecked` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "isChecked",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;
