-- DropForeignKey
ALTER TABLE `playlists` DROP FOREIGN KEY `playlists_platformId_fkey`;

-- DropForeignKey
ALTER TABLE `playlists` DROP FOREIGN KEY `playlists_userId_fkey`;

-- DropForeignKey
ALTER TABLE `playlists_songs` DROP FOREIGN KEY `playlists_songs_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `playlists_songs` DROP FOREIGN KEY `playlists_songs_songId_fkey`;

-- DropForeignKey
ALTER TABLE `songs` DROP FOREIGN KEY `songs_platformId_fkey`;

-- DropForeignKey
ALTER TABLE `soundcloud_songs` DROP FOREIGN KEY `soundcloud_songs_songId_fkey`;

-- DropIndex
DROP INDEX `songs_name_key` ON `songs`;

-- AddForeignKey
ALTER TABLE `playlists` ADD CONSTRAINT `playlists_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `platforms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlists` ADD CONSTRAINT `playlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlists_songs` ADD CONSTRAINT `playlists_songs_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlists_songs` ADD CONSTRAINT `playlists_songs_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `songs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `songs` ADD CONSTRAINT `songs_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `platforms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soundcloud_songs` ADD CONSTRAINT `soundcloud_songs_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `songs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
