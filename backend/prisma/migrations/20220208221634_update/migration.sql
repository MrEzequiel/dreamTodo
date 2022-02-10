/*
  Warnings:

  - You are about to drop the `TokenUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TokenUser" DROP CONSTRAINT "TokenUser_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "TokenUser";

-- CreateTable
CREATE TABLE "token_user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userToken" TEXT NOT NULL,
    "tokenGoogle" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token_user"("id");

-- AddForeignKey
ALTER TABLE "token_user" ADD CONSTRAINT "token_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
