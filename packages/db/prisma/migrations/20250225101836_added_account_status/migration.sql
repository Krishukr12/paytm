-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'inactive', 'blocked');

-- AlterTable
ALTER TABLE "AccountDetails" ADD COLUMN     "Status" "AccountStatus" NOT NULL DEFAULT 'active';
