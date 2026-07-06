-- CreateEnum
CREATE TYPE "Item" AS ENUM ('BOOK', 'ITEM');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'UNAWAILABLE', 'BORROWED');

-- CreateTable
CREATE TABLE "inventories" (
    "id" TEXT NOT NULL,
    "type" "Item" NOT NULL DEFAULT 'ITEM',
    "fatherID" TEXT,
    "title" TEXT NOT NULL,
    "cover" TEXT,
    "author" TEXT,
    "barCode" TEXT NOT NULL,
    "isbn" TEXT,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "branchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inventories_branchId_idx" ON "inventories"("branchId");

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
