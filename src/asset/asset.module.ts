import { Module } from '@nestjs/common';
import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [AssetService, AssetRepository, PrismaService],
    exports: [AssetService],
})
export class AssetModule {}
