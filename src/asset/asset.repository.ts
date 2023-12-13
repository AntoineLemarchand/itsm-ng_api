import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
class AssetRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getAssetTypeById(id: number) {
    return await this.prisma.dashboard_AssetType.findUnique({
      where: { id: id },
    });
  }

  async count(condition: object = {}): Promise<number> {
    return await this.prisma.dashboard_Asset.count({
        where: condition,
      },
    );
  }

  async get(where: object = {}, includes: object = {}): Promise<any[]> {
    return await this.prisma.dashboard_Asset.findMany({
      where: where,
      include: includes,
    });
  }
}

export { AssetRepository };
