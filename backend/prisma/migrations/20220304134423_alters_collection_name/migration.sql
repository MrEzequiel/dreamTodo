/*
  Warnings:

  - You are about to drop the column `id_colletion` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the `colletions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_collection` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_id_todo_fkey";

-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_userId_fkey";

-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_id_colletion_fkey";

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "id_colletion",
ADD COLUMN     "id_collection" TEXT NOT NULL;

-- DropTable
DROP TABLE "colletions";

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_todo" TEXT,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collections_id_key" ON "collections"("id");

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_id_collection_fkey" FOREIGN KEY ("id_collection") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_id_todo_fkey" FOREIGN KEY ("id_todo") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
