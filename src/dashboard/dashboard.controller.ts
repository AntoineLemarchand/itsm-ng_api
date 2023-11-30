import { Controller, Get, Inject, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from 'src/asset/asset.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(
      @Inject(AssetService) private assetService: AssetService,
    ) {}

    @Get('count/:type')
    async getAssetCount(@Param('type') type: string) {
      return await this.assetService.countByType(type);
    }
}
