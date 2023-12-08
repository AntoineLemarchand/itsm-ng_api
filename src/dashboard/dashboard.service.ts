import { Inject, Injectable } from '@nestjs/common';
import { AssetService } from 'src/asset/asset.service';

@Injectable()
export class DashboardService {
  constructor(@Inject(AssetService) private assetService: AssetService) {}

  async countByType(type: string) {
    try {
      switch (type) {
        case 'Ticket':
          throw new Error(`Type ${type} is not supported`);
        case 'Entity':
          throw new Error(`Type ${type} is not supported`);
        case 'Profile':
          throw new Error(`Type ${type} is not supported`);
        case 'Group':
          throw new Error(`Type ${type} is not supported`);
        case 'User':
          throw new Error(`Type ${type} is not supported`);
        default:
          return await this.assetService.countByType(type);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
