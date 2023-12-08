import { Controller, Get, Inject, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from 'src/asset/asset.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(@Inject(AssetService) private assetService: AssetService) {}

  @ApiOperation({ summary: 'Get the total number of assets' })
  @ApiResponse({ status: 200, description: 'The total number of assets' })
  @Get('count/:type')
  async getAssetCount(@Param('type') type: string) {
    return await this.assetService.countByType(type);
  }
}
