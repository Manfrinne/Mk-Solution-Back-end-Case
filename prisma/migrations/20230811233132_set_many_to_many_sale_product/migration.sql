/*
  Warnings:

  - You are about to drop the `_ProductToSale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToSale" DROP CONSTRAINT "_ProductToSale_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSale" DROP CONSTRAINT "_ProductToSale_B_fkey";

-- DropTable
DROP TABLE "_ProductToSale";

-- CreateTable
CREATE TABLE "SaleToProduct" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SaleToProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleToProduct" ADD CONSTRAINT "SaleToProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleToProduct" ADD CONSTRAINT "SaleToProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
