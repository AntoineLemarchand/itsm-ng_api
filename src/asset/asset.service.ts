/**
 * ---------------------------------------------------------------------
 * ITSM-NG
 * Copyright (C) 2024 ITSM-NG and contributors.
 *
 * https://www.itsm-ng.org
 *
 * ---------------------------------------------------------------------
 *
 * LICENSE
 *
 * This file is part of ITSM-NG.
 *
 * ITSM-NG is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * ITSM-NG is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ITSM-NG. If not, see <http://www.gnu.org/licenses/>.
 * ---------------------------------------------------------------------
 */

import { Inject, Injectable } from '@nestjs/common';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
  constructor(
    @Inject(AssetRepository) private assetRepository: AssetRepository,
  ) {}

  async count(condition: object) {
    try {
      const result = await this.assetRepository.count(condition);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async bar(
    condition: object = {},
    compare: string = 'name',
    isForeign: boolean = false,
  ) {
    try {
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
}
