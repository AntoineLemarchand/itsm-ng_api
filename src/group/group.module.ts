import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, PrismaService],
})
export class GroupModule {}
