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
import { Prisma } from '@prisma/client';
import { AssetService } from 'src/asset/asset.service';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(AssetService) private assetService: AssetService,
    @Inject(TicketService) private ticketService: TicketService,
  ) {}

  async count(query: any) {
    const { statType, statSelection } = query;
    const service = this.getServiceFromStatType(statType);
    return await service.count(
      this.selectionToCondition(await JSON.parse(statSelection)),
    );
  }

  async line(query: any) {
    const { statType, statSelection } = query;
    const service = this.getServiceFromStatType(statType);
    const result = await service.bar(
      this.selectionToCondition(await JSON.parse(statSelection)),
      query.comparison,
      Object.values(
        Prisma[
          `Dashboard_${statType.charAt(0)}${statType.slice(1)}ScalarFieldEnum`
        ],
      ).includes(query.comparison + 'Id'),
    );
    return [result[0], [result[1]]];
  }

  async bar(query: any) {
    const { statType, statSelection } = query;
    const service = this.getServiceFromStatType(statType);
    return await service.bar(
      this.selectionToCondition(await JSON.parse(statSelection)),
      query.comparison,
      Object.values(
        Prisma[
          `Dashboard_${statType.charAt(0)}${statType.slice(1)}ScalarFieldEnum`
        ],
      ).includes(query.comparison + 'Id'),
    );
  }

  private getServiceFromStatType(statType) {
    switch (statType) {
      case 'Ticket':
        return this.ticketService;
      case 'Entity':
        throw new Error(`Type ${statType} is not supported`);
      case 'Profile':
        throw new Error(`Type ${statType} is not supported`);
      case 'Group':
        throw new Error(`Type ${statType} is not supported`);
      case 'User':
        throw new Error(`Type ${statType} is not supported`);
      default:
        return this.assetService;
    }
  }

  private findRelationships(type: string) {
    const schema = Prisma.dmmf.datamodel.models;
    return schema.find((schema) => schema.name === `Dashboard_${type}`);
  }

  getComparisons(type: string): any[] {
    const columns = this.findRelationships(type).fields as any;
    const comparableColumns = columns.filter(
      (column: any) => column.kind === 'object',
    );
    const result = comparableColumns.map((column: any) => {
      return {
        name: column.name,
        type: column.type,
      };
    });
    return result;
  }

  private assetSelectionToCondition(selection: object = {}) {
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

  private selectionToCondition(selection: object = {}, isAsset = false) {
    if (isAsset) return this.assetSelectionToCondition(selection);
    const condition = { AND: [] };
    for (const col in selection) {
      const subCondition = {};
      const values = Object.keys(selection[col]);
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
      condition.AND.push(subCondition);
    }
    return condition;
  }
}
