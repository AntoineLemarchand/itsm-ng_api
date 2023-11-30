import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
class AssetRepository {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
  ) {}

  async getById(id: number) {
    return await this.prisma.dashboard_AssetType.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getByName(name: string) {
    return await this.prisma.dashboard_AssetType.findUnique({
      where: {
        name: name,
      },
    });
  }

  async countByType(type: string) {
    const assetType = await this.getByName(type)
    if (!assetType) {
      return 0;
    }
    return await this.prisma.dashboard_Asset.count({
      where: {
        assetType: assetType,
      },
    });
  }
}

export { AssetRepository };