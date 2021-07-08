/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `StudyCourse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `StudyCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudyCourse" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudyCourse.code_unique" ON "StudyCourse"("code");
