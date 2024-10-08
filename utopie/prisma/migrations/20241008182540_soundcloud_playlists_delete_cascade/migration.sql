-- DropForeignKey
ALTER TABLE `soundcloud_playlists` DROP FOREIGN KEY `soundcloud_playlists_playlistId_fkey`;

-- AddForeignKey
ALTER TABLE `soundcloud_playlists` ADD CONSTRAINT `soundcloud_playlists_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
