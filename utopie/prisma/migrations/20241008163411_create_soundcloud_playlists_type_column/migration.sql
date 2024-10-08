-- AlterTable
ALTER TABLE `soundcloud_playlists` ADD COLUMN `type` ENUM('REPOSTS', 'LIKES', 'CUSTOM') NOT NULL DEFAULT 'CUSTOM',
    MODIFY `soundcloudPlaylistId` INTEGER NULL;
