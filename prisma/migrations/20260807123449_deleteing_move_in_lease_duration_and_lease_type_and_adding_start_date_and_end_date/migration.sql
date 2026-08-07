/*
  Warnings:

  - You are about to drop the column `leaseDuration` on the `rental-requests` table. All the data in the column will be lost.
  - You are about to drop the column `leaseDurationType` on the `rental-requests` table. All the data in the column will be lost.
  - You are about to drop the column `moveInDate` on the `rental-requests` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `rental-requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `rental-requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rental-requests" DROP COLUMN "leaseDuration",
DROP COLUMN "leaseDurationType",
DROP COLUMN "moveInDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
