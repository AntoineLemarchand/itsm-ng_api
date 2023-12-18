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
      const result = await this.assetRepository.count(condition);
      return result;
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

      const labels = new Set(
        result.map((asset) => (asset[compare] ? asset[compare].name : 'null')),
      );
      const series = [];
      for (const label of labels) {
        const count = result.filter(
          isForeign
            ? (asset) =>
                (asset[compare] ? asset[compare].name : 'null') === label
            : (asset) => asset[compare] === label,
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
        const keys = Object.keys(selection[assetType][col]);
        if (keys.length === 0) continue;

        let hasNull = false;
        if (keys.includes('null')) {
          keys.splice(keys.indexOf('null'), 1);
          hasNull = true;
        }

        if (!condition[col]) {
          condition[col] = {
            name: {
              in: keys,
            },
          };
        } else {
          condition[col].name.in = [...condition[col].name.in, ...keys];
        }
        if (hasNull) {
          condition['OR'] = [{ [col + 'Id']: null }, { [col]: condition[col] }];
          delete condition[col];
        }
      }
    }

    return condition;
  }
}
