/*
  Warnings:

  - You are about to drop the column `todoId` on the `colletions` table. All the data in the column will be lost.
  - You are about to drop the column `colletion` on the `todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_todo]` on the table `colletions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_todo` to the `colletions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_colletion` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_todoId_fkey";

-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "colletions" DROP COLUMN "todoId",
ADD COLUMN     "id_todo" TEXT NOT NULL,
ADD CONSTRAINT "colletions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "colletion",
ADD COLUMN     "id_colletion" TEXT NOT NULL,
ADD CONSTRAINT "todo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "colletions_id_todo_key" ON "colletions"("id_todo");

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_id_colletion_fkey" FOREIGN KEY ("id_colletion") REFERENCES "colletions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_id_todo_fkey" FOREIGN KEY ("id_todo") REFERENCES "todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
