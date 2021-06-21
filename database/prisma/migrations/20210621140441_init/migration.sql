/*
  Warnings:

  - Added the required column `matriculationsNUmber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "matriculationsNUmber" TEXT NOT NULL,
ADD COLUMN     "semester" INTEGER NOT NULL;
