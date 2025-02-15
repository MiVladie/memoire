/*
  Warnings:

  - You are about to drop the column `theme` on the `platforms` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `soundcloud_playlists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `platforms` DROP COLUMN `theme`;

-- AlterTable
ALTER TABLE `playlists` ADD COLUMN `type` ENUM('REPOSTS', 'LIKES', 'CUSTOM') NOT NULL DEFAULT 'CUSTOM';

-- AlterTable
ALTER TABLE `soundcloud_playlists` DROP COLUMN `type`;
