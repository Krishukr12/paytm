/*
  Warnings:

  - You are about to drop the column `Status` on the `AccountDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccountDetails" DROP COLUMN "Status";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'active';
