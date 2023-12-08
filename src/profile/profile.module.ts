import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProfileService, ProfileRepository, PrismaService],
  controllers: [ProfileController],
})
export class ProfileModule {}
