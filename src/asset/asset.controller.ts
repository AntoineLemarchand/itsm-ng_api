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
      return await this.assetService.countByType({ type });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
