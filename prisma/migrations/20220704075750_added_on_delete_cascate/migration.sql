-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
