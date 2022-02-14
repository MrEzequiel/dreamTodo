-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_id_todo_fkey";

-- DropIndex
DROP INDEX "colletions_id_todo_key";

-- AlterTable
ALTER TABLE "colletions" ALTER COLUMN "id_todo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_id_todo_fkey" FOREIGN KEY ("id_todo") REFERENCES "todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
