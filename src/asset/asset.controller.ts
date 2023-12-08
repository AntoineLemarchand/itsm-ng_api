import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('asset')
@Controller('asset')
export class AssetController {
  constructor(@Inject(AssetService) private assetService: AssetService) {}

  @ApiOperation({ summary: 'Get the total number of assets' })
  @ApiResponse({ status: 200, description: 'The total number of assets' })
  @Get('count')
  async count(): Promise<number> {
    return await this.assetService.count();
  }

  @ApiOperation({ summary: 'Get the total number of assets by type' })
  @ApiResponse({
    status: 200,
    description: 'The total number of assets by type',
  })
  @ApiResponse({ status: 404, description: 'Asset type not found' })
  @Get('count/:type')
  async countByType(@Param('type') type: string) {
    try {
      return await this.assetService.countByType(type);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
