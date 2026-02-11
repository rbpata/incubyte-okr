/*
  Warnings:

  - You are about to drop the column `create_at` on the `Objective` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KeyResult" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
