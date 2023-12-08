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

  async countFromSelection(selection: object): Promise<number> {
    // selection -> { Computer: { modelId: { test: {} }, typeId: {} } }
    const condition = {
      assetType: {
        name: {
          in: Object.keys(selection),
        },
      },
    };
    for (const assetType in selection) {
      for (const col in selection[assetType]) {
        condition[col] = {
          name: {
            in: Object.keys(selection[assetType][col]),
          },
        };
      }
    }
    return await this.prisma.dashboard_Asset.count({
      where: condition,
    });
  }
}

export { AssetRepository };
