/*
  Warnings:

  - You are about to alter the column `price` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `leaseDuration` on the `rental-requests` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Made the column `propertyId` on table `rental-requests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenantId` on table `rental-requests` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rental-requests" DROP CONSTRAINT "rental-requests_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "rental-requests" DROP CONSTRAINT "rental-requests_tenantId_fkey";

-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "rental-requests" ALTER COLUMN "leaseDuration" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "propertyId" SET NOT NULL,
ALTER COLUMN "tenantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "rental-requests" ADD CONSTRAINT "rental-requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental-requests" ADD CONSTRAINT "rental-requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
