/*
  Warnings:

  - You are about to drop the column `profileImg` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileImg";

-- CreateTable
CREATE TABLE "profile_img" (
    "id" SERIAL NOT NULL,
    "image" BYTEA NOT NULL,
    "type" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "profile_img_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_img_username_key" ON "profile_img"("username");

-- AddForeignKey
ALTER TABLE "profile_img" ADD CONSTRAINT "profile_img_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
