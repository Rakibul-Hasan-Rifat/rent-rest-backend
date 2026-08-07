/*
  Warnings:

  - Made the column `landlordId` on table `properties` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_landlordId_fkey";

-- DropIndex
DROP INDEX "rental-requests_propertyId_key";

-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "pricePeriod" SET DEFAULT 'DAILY',
ALTER COLUMN "landlordId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
