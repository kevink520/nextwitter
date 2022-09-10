-- CreateTable
CREATE TABLE "_UserLikedTweet" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedTweet_AB_unique" ON "_UserLikedTweet"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedTweet_B_index" ON "_UserLikedTweet"("B");

-- AddForeignKey
ALTER TABLE "_UserLikedTweet" ADD CONSTRAINT "_UserLikedTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedTweet" ADD CONSTRAINT "_UserLikedTweet_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
