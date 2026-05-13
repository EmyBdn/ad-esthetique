/*
  Warnings:

  - You are about to drop the column `discountType` on the `discounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "discountType",
ADD COLUMN     "discount_type" "DiscountType" NOT NULL DEFAULT 'PERCENTAGE';
