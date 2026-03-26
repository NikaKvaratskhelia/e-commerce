/*
  Warnings:

  - Added the required column `prodcutId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "prodcutId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_prodcutId_fkey" FOREIGN KEY ("prodcutId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
