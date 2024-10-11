/*
  Warnings:

  - Added the required column `order` to the `playlists_songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `playlists_songs` ADD COLUMN `order` INTEGER NOT NULL;
