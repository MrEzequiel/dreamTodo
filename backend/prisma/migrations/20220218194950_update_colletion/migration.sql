/*
  Warnings:

  - Added the required column `userId` to the `colletions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colletions" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
