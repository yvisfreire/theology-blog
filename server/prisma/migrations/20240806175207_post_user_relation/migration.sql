-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
