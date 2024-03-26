/*
  Warnings:

  - You are about to drop the column `name` on the `HSSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HSSection" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "HSFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HSFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HSFile" ADD CONSTRAINT "HSFile_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "HSUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
