import { Module } from '@nestjs/common';
import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssetController } from './asset.controller';

@Module({
  providers: [AssetService, AssetRepository, PrismaService],
  exports: [AssetService],
  controllers: [AssetController],
})
export class AssetModule {}
