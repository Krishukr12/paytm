-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "accountDetailsAccountNumber" TEXT;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_receivingAccountNumber_fkey" FOREIGN KEY ("receivingAccountNumber") REFERENCES "AccountDetails"("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_accountDetailsAccountNumber_fkey" FOREIGN KEY ("accountDetailsAccountNumber") REFERENCES "AccountDetails"("accountNumber") ON DELETE SET NULL ON UPDATE CASCADE;
