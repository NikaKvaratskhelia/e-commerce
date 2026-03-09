/*
  Warnings:

  - Changed the type of `title` on the `ProductCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "title",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropEnum
DROP TYPE "product_category";

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_title_key" ON "ProductCategory"("title");
