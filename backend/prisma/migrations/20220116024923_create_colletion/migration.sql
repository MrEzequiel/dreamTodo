/*
  Warnings:

  - Made the column `isChecked` on table `todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "isChecked" SET NOT NULL,
ALTER COLUMN "isChecked" SET DEFAULT false;

-- CreateTable
CREATE TABLE "colletions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "todo_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "colletions_id_key" ON "colletions"("id");

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
