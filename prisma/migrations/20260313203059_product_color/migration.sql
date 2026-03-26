/*
  Warnings:

  - A unique constraint covering the columns `[productColorId,cartId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productColorId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropIndex
DROP INDEX "CartItem_productId_cartId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "productColorId" INTEGER NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productColorId_cartId_key" ON "CartItem"("productColorId", "cartId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productColorId_fkey" FOREIGN KEY ("productColorId") REFERENCES "ProductColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
