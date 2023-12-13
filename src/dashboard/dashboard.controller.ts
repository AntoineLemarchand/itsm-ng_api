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
  @ApiProperty({ enum: ['Asset', 'Ticket', 'Entity', 'Group', 'User'] })
  readonly statType: string;

  @ApiProperty()
  readonly statSelection: object;
}

class GraphDto {
  @ApiProperty({ enum: ['Asset', 'Ticket', 'Entity', 'Group', 'User'] })
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
  @ApiResponse({ status: 200, description: 'The total number of assets' })
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
  @ApiResponse({ status: 200, description: 'The total number of assets' })
  @ApiResponse({ status: 400, description: 'Could not fetch request' })
  @Get('bar')
  async getBar(@Query() query: GraphDto): Promise<any[]> {
    try {
      const result = await this.dashboardService.bar(query);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  @ApiOperation({ summary: 'Get the parameters for a chartistjs PieGraph' })
  @ApiResponse({ status: 200, description: 'The total number of assets' })
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
      const result = await this.dashboardService.getComparisons(type);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }
}
