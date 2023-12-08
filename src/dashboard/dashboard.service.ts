import { Inject, Injectable } from '@nestjs/common';
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
}
