import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
class AssetRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.dashboard_AssetType.findMany({
      include: {
        assets: true,
      },
    });
  }

  async findById(id: number) {
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

  async count() {
    return await this.prisma.dashboard_AssetType.count();
  }

  async countByType(type: string) {
    const assetType = await this.getByName(type);
    if (!assetType) {
      throw new Error(`Asset type ${type} does not exist`);
    }
    return await this.prisma.dashboard_Asset.count({
      where: {
        assetType: assetType,
      },
    });
  }
}

export { AssetRepository };
