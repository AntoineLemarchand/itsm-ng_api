import { Controller, Get, HttpException, Inject, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


class CountDto {
  readonly statType: string;
  readonly statSelection: object;
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
      console.log(result);
      return result;
    } catch (error) {
      console.log(error.message)
      throw new HttpException(error.message, 400);
    }
  }
}
