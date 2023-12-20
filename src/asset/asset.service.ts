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
    const condition = { OR: [] };
    for (const assetType in selection) {
      const assetCondition = {
        AND: [{ assetType: { name: assetType } }],
      } as { AND: object[] };

      for (const col in selection[assetType]) {
        const subCondition = {};
        const values = Object.keys(selection[assetType][col]);
        const canBeNull = values.includes('null');

        if (!values.length) continue;
        if (canBeNull) {
          values.splice(values.indexOf('null'), 1);
          subCondition['OR'] = [
            { [col + 'Id']: null },
            { [col]: { name: { in: values } } },
          ];
        } else {
          subCondition[col] = { name: { in: values } };
        }
        assetCondition.AND.push(subCondition);
      }
      condition.OR.push(assetCondition);
    }
    return condition;
  }
}
