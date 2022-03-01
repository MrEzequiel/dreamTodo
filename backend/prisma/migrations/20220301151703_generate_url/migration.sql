-- AlterTable
ALTER TABLE "users" ALTER COLUMN "imageURL" SET DEFAULT ${process.env.APP_URL}/files/${imageProfile};
