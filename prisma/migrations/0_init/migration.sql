-- CreateTable
CREATE TABLE `Dashboard_Entity` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_Profile` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_ProfileEntity` (
    `id` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,
    `entityId` INTEGER NOT NULL,

    UNIQUE INDEX `Dashboard_ProfileEntity_profileId_entityId_key`(`profileId`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_Group` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `entityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_User` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_AssetType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Dashboard_AssetType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_Type` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `assetTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `assetTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_Model` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `assetTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `assetTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dashboard_Asset` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `entityId` INTEGER NOT NULL,
    `assetTypeId` INTEGER NOT NULL,
    `locationId` INTEGER NULL,
    `modelId` INTEGER NULL,
    `typeId` INTEGER NULL,

    PRIMARY KEY (`id`, `assetTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `glpi_configs` (
    `id` INTEGER NOT NULL,
    `context` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Dashboard_ProfileEntityToDashboard_User` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Dashboard_ProfileEntityToDashboard_User_AB_unique`(`A`, `B`),
    INDEX `_Dashboard_ProfileEntityToDashboard_User_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Dashboard_GroupToDashboard_User` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Dashboard_GroupToDashboard_User_AB_unique`(`A`, `B`),
    INDEX `_Dashboard_GroupToDashboard_User_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dashboard_Entity` ADD CONSTRAINT `Dashboard_Entity_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Dashboard_Entity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_ProfileEntity` ADD CONSTRAINT `Dashboard_ProfileEntity_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Dashboard_Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_ProfileEntity` ADD CONSTRAINT `Dashboard_ProfileEntity_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Dashboard_Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Group` ADD CONSTRAINT `Dashboard_Group_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Dashboard_Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Type` ADD CONSTRAINT `Dashboard_Type_assetTypeId_fkey` FOREIGN KEY (`assetTypeId`) REFERENCES `Dashboard_AssetType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Model` ADD CONSTRAINT `Dashboard_Model_assetTypeId_fkey` FOREIGN KEY (`assetTypeId`) REFERENCES `Dashboard_AssetType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Asset` ADD CONSTRAINT `Dashboard_Asset_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Dashboard_Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Asset` ADD CONSTRAINT `Dashboard_Asset_assetTypeId_fkey` FOREIGN KEY (`assetTypeId`) REFERENCES `Dashboard_AssetType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Asset` ADD CONSTRAINT `Dashboard_Asset_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Dashboard_Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Asset` ADD CONSTRAINT `Dashboard_Asset_modelId_assetTypeId_fkey` FOREIGN KEY (`modelId`, `assetTypeId`) REFERENCES `Dashboard_Model`(`id`, `assetTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dashboard_Asset` ADD CONSTRAINT `Dashboard_Asset_typeId_assetTypeId_fkey` FOREIGN KEY (`typeId`, `assetTypeId`) REFERENCES `Dashboard_Type`(`id`, `assetTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Dashboard_ProfileEntityToDashboard_User` ADD CONSTRAINT `_Dashboard_ProfileEntityToDashboard_User_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dashboard_ProfileEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Dashboard_ProfileEntityToDashboard_User` ADD CONSTRAINT `_Dashboard_ProfileEntityToDashboard_User_B_fkey` FOREIGN KEY (`B`) REFERENCES `Dashboard_User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Dashboard_GroupToDashboard_User` ADD CONSTRAINT `_Dashboard_GroupToDashboard_User_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dashboard_Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Dashboard_GroupToDashboard_User` ADD CONSTRAINT `_Dashboard_GroupToDashboard_User_B_fkey` FOREIGN KEY (`B`) REFERENCES `Dashboard_User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

