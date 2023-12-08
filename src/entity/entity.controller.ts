import { Controller, Get, Inject } from '@nestjs/common';
import { EntityService } from './entity.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('entity')
@Controller('entity')
export class EntityController {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
  ) {}

  @ApiOperation({ summary: 'Get the total number of entities' })
  @ApiResponse({ status: 200, description: 'The total number of entities' })
  @Get('count')
  async count(): Promise<number> {
    return await this.entityService.count();
  }
}
