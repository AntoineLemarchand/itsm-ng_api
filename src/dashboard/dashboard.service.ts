/**
 * ---------------------------------------------------------------------
 * ITSM-NG
 * Copyright (C) 2022 ITSM-NG and contributors.
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
import { Prisma } from '@prisma/client';
import { AssetService } from 'src/asset/asset.service';

@Injectable()
export class DashboardService {
  constructor(@Inject(AssetService) private assetService: AssetService) {}

  async count(query: any) {
    const { statType, statSelection } = query;
    switch (statType) {
      case 'Ticket':
        throw new Error(`Type ${statType} is not supported`);
      case 'Entity':
        throw new Error(`Type ${statType} is not supported`);
      case 'Profile':
        throw new Error(`Type ${statType} is not supported`);
      case 'Group':
        throw new Error(`Type ${statType} is not supported`);
      case 'User':
        throw new Error(`Type ${statType} is not supported`);
      default:
        return await this.assetService.countByType(
          await JSON.parse(statSelection),
        );
    }
  }

  async line(query: any) {
    const { statType, statSelection } = query;
    switch (statType) {
      case 'Ticket':
        throw new Error(`Type ${statType} is not supported`);
      case 'Entity':
        throw new Error(`Type ${statType} is not supported`);
      case 'Profile':
        throw new Error(`Type ${statType} is not supported`);
      case 'Group':
        throw new Error(`Type ${statType} is not supported`);
      case 'User':
        throw new Error(`Type ${statType} is not supported`);
      default:
        const result = await this.assetService.barByType(
          await JSON.parse(statSelection),
          query.comparison,
          Object.values(
            Prisma[
              `Dashboard_${statType.charAt(0)}${statType.slice(
                1,
              )}ScalarFieldEnum`
            ],
          ).includes(query.comparison + 'Id'),
        );
        return [result[0], [result[1]]];
    }
  }

  async bar(query: any) {
    const { statType, statSelection } = query;
    switch (statType) {
      case 'Ticket':
        throw new Error(`Type ${statType} is not supported`);
      case 'Entity':
        throw new Error(`Type ${statType} is not supported`);
      case 'Profile':
        throw new Error(`Type ${statType} is not supported`);
      case 'Group':
        throw new Error(`Type ${statType} is not supported`);
      case 'User':
        throw new Error(`Type ${statType} is not supported`);
      default:
        return await this.assetService.barByType(
          await JSON.parse(statSelection),
          query.comparison,
          Object.values(
            Prisma[
              `Dashboard_${statType.charAt(0)}${statType.slice(
                1,
              )}ScalarFieldEnum`
            ],
          ).includes(query.comparison + 'Id'),
        );
    }
  }

  getComparisons(type: string): any[] {
    const columns =
      Prisma[`Dashboard_${type.charAt(0)}${type.slice(1)}ScalarFieldEnum`];
    const comparableColumns = Object.values(columns).filter(
      (column: string) => {
        return column.endsWith('Id');
      },
    );
    // if value can be null, add null to the list
    return comparableColumns.map((column: string) => column.slice(0, -2));
  }
}
