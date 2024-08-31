/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_categoryId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);
