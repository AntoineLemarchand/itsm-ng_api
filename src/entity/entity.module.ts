import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityRepository } from './entity.repository';
import { EntityController } from './entity.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EntityService, EntityRepository, PrismaService],
  controllers: [EntityController],
  exports: [EntityService],
})
export class EntityModule {}
