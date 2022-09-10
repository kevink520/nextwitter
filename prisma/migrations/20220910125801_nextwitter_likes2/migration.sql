/*
  Warnings:

  - You are about to drop the `_UserLikedTweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserLikedTweet" DROP CONSTRAINT "_UserLikedTweet_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedTweet" DROP CONSTRAINT "_UserLikedTweet_B_fkey";

-- DropTable
DROP TABLE "_UserLikedTweet";

-- CreateTable
CREATE TABLE "_TweetToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TweetToUser_AB_unique" ON "_TweetToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TweetToUser_B_index" ON "_TweetToUser"("B");

-- AddForeignKey
ALTER TABLE "_TweetToUser" ADD CONSTRAINT "_TweetToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TweetToUser" ADD CONSTRAINT "_TweetToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
