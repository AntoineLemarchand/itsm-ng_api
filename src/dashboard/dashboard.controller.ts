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
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class CountDto {
  @ApiProperty()
  readonly statType: string;

  @ApiProperty()
  readonly statSelection: object;
}

class GraphDto {
  @ApiProperty()
  readonly statType: string;

  @ApiProperty()
  readonly statSelection: object;

  @ApiProperty()
  readonly comparison: object;
}

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject(DashboardService)
    private readonly dashboardService: DashboardService,
  ) {}

  @ApiOperation({ summary: 'Get the total number of assets' })
  @ApiResponse({ status: 200, description: 'The total number of assets' })
  @ApiResponse({ status: 400, description: 'Could not count request' })
  @Get('count')
  async getCount(@Query() query: CountDto): Promise<number> {
    try {
      const result = await this.dashboardService.count(query);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  @ApiOperation({ summary: 'Get the parameters for a chartistjs LineGraph' })
  @ApiResponse({ status: 200, description: 'The fetched data' })
  @ApiResponse({ status: 400, description: 'Could not fetch request' })
  @Get('line')
  async getLine(@Query() query: GraphDto): Promise<any[]> {
    try {
      const result = await this.dashboardService.line(query);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  @ApiOperation({ summary: 'Get the parameters for a chartistjs BarGraph' })
  @ApiResponse({ status: 200, description: 'The fetched data' })
  @ApiResponse({ status: 400, description: 'Could not fetch request' })
  @Get('bar')
  async getBar(@Query() query: any): Promise<any[]> {
    try {
      const result = await this.dashboardService.bar(query);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  @ApiOperation({ summary: 'Get the parameters for a chartistjs PieGraph' })
  @ApiResponse({ status: 200, description: 'The fetched data' })
  @ApiResponse({ status: 400, description: 'Could not fetch request' })
  @Get('pie')
  async getPie(@Query() query: GraphDto): Promise<any[]> {
    try {
      const result = await this.dashboardService.bar(query);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  @ApiOperation({ summary: 'Get the comparable data for object' })
  @ApiResponse({ status: 200, description: 'The comparable data' })
  @ApiResponse({ status: 400, description: 'Could not fetch request' })
  @Get('comparisons/:type')
  async getComparisons(@Param('type') type: string): Promise<any[]> {
    try {
      const result = this.dashboardService.getComparisons(type);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }
}
