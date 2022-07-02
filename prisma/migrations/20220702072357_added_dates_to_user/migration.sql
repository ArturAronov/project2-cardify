-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "dateCreated" DROP NOT NULL,
ALTER COLUMN "dateCreated" DROP DEFAULT,
ALTER COLUMN "dateUpdated" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "dateCreated" DROP NOT NULL,
ALTER COLUMN "dateCreated" DROP DEFAULT,
ALTER COLUMN "dateUpdated" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateCreated" TIMESTAMP(3),
ADD COLUMN     "dateUpdated" TIMESTAMP(3);
