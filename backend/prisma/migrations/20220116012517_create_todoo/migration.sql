-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isChecked" BOOLEAN
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_id_key" ON "todo"("id");
