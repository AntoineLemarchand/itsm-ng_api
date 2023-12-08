import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(
    @Inject(GroupService) private readonly groupService: GroupService,
  ) {}

  @ApiOperation({ summary: 'Get the total number of groups' })
  @ApiResponse({ status: 200, description: 'The total number of groups' })
  @Get('count')
  async count(): Promise<number> {
    return await this.groupService.count();
  }
}
