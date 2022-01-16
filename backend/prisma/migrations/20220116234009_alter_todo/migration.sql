/*
  Warnings:

  - You are about to drop the column `todo_id` on the `colletions` table. All the data in the column will be lost.
  - Added the required column `colletion` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_todo_id_fkey";

-- AlterTable
ALTER TABLE "colletions" DROP COLUMN "todo_id",
ADD COLUMN     "todoId" TEXT;

-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "colletion" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
