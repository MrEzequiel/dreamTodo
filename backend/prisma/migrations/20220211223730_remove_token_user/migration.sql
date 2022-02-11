/*
  Warnings:

  - You are about to drop the `token_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "token_user" DROP CONSTRAINT "token_user_userId_fkey";

-- DropTable
DROP TABLE "token_user";
