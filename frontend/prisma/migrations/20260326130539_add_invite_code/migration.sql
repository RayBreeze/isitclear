/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "inviteCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_inviteCode_key" ON "Class"("inviteCode");
