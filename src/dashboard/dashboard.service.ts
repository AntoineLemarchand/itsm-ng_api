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
        return await this.assetService.lineByType(
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
