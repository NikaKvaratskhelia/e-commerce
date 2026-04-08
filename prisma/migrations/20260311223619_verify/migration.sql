/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `VerifyEmail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VerifyEmail_userEmail_key" ON "VerifyEmail"("userEmail");
