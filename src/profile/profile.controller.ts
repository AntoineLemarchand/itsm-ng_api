import { Controller, Get, Inject } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(ProfileService) private readonly profileService: ProfileService,
  ) {}

  @ApiOperation({ summary: 'Get the total number of profiles' })
  @ApiResponse({ status: 200, description: 'The total number of profiles' })
  @Get('count')
  async count(): Promise<number> {
    return await this.profileService.count();
  }
}
