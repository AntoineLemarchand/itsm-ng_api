import { Inject, Injectable } from '@nestjs/common';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
  constructor(
    @Inject(AssetRepository) private assetRepository: AssetRepository,
  ) {}

  async count() {
    return await this.assetRepository.count();
  }

  async countByType(selection: object = {}) {
    try {
      const condition = this.selectionToCondition(selection);
      return await this.assetRepository.count(condition);
    } catch (error) {
      throw new Error(error);
    }
  }

  async lineByType(selection: object = {}, compare: string = 'name') {
    try {
      const condition = this.selectionToCondition(selection);
      const includes = {};
      includes[compare] = true;
      const result = await this.assetRepository.get(condition, includes);

      const labels = new Set(result.map((asset) => asset.model.name));
      const series = [];
      for (const label of labels) {
        const count = result.filter(
          (asset) => asset.model.name === label,
        ).length;
        series.push(count);
      }

      return [Array.from(labels), series];
    } catch (error) {
      throw new Error(error);
    }
  }

  async barByType(
    selection: object = {},
    compare: string = 'name',
    isForeign: boolean = false,
  ) {
    try {
      const condition = this.selectionToCondition(selection);
      const includes = {};
      if (isForeign) includes[compare] = true;
      const result = await this.assetRepository.get(condition, includes);

      const labels = new Set(result.map((asset) => asset[compare].name));
      const series = [];
      for (const label of labels) {
        const count = result.filter(
          (asset) => asset[compare].name === label,
        ).length;
        series.push(count);
      }

      return [Array.from(labels), series];
    } catch (error) {
      throw new Error(error);
    }
  }

  private selectionToCondition(selection: object = {}) {
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

    return condition;
  }
}
