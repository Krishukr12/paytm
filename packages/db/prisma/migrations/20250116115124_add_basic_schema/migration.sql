-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AccountDetails" (
    "accountNumber" SERIAL NOT NULL,
    "accountBalance" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AccountDetails_pkey" PRIMARY KEY ("accountNumber")
);

-- CreateTable
CREATE TABLE "TransactionHistory" (
    "transactionId" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "receivingAccountNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderAccountId" INTEGER NOT NULL,
    "userUserId" INTEGER,

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AccountDetails_userId_key" ON "AccountDetails"("userId");

-- AddForeignKey
ALTER TABLE "AccountDetails" ADD CONSTRAINT "AccountDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_senderAccountId_fkey" FOREIGN KEY ("senderAccountId") REFERENCES "AccountDetails"("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
