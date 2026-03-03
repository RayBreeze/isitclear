-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" TEXT,
ADD COLUMN     "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "subject" TEXT;
