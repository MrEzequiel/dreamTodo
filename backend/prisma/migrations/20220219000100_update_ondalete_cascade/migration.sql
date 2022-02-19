-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_id_todo_fkey";

-- DropForeignKey
ALTER TABLE "colletions" DROP CONSTRAINT "colletions_userId_fkey";

-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_id_colletion_fkey";

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_id_colletion_fkey" FOREIGN KEY ("id_colletion") REFERENCES "colletions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_id_todo_fkey" FOREIGN KEY ("id_todo") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colletions" ADD CONSTRAINT "colletions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
