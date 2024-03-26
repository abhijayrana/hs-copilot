/*
  Warnings:

  - Made the column `schoolId` on table `HSUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "HSUser" DROP CONSTRAINT "HSUser_schoolId_fkey";

-- AlterTable
ALTER TABLE "HSUser" ALTER COLUMN "schoolId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "HSUser" ADD CONSTRAINT "HSUser_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "HSSchool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
