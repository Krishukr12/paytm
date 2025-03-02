/*
  Warnings:

  - The primary key for the `AccountDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_senderAccountId_fkey";

-- AlterTable
ALTER TABLE "AccountDetails" DROP CONSTRAINT "AccountDetails_pkey",
ALTER COLUMN "accountNumber" DROP DEFAULT,
ALTER COLUMN "accountNumber" SET DATA TYPE TEXT,
ADD CONSTRAINT "AccountDetails_pkey" PRIMARY KEY ("accountNumber");
DROP SEQUENCE "AccountDetails_accountNumber_seq";

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "receivingAccountNumber" SET DATA TYPE BIGINT,
ALTER COLUMN "senderAccountId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_senderAccountId_fkey" FOREIGN KEY ("senderAccountId") REFERENCES "AccountDetails"("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
