import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { Prisma } from '@prisma/client';
type Entity = Prisma.Dashboard_EntityGetPayload<Record<string, unknown>>;
type CreateEntityData = Prisma.Dashboard_EntityCreateInput;

@Injectable()
export class EntityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Entity[]> {
    return this.prisma.dashboard_Entity.findMany();
  }

  async findById(id: number): Promise<Entity | null> {
    return this.prisma.dashboard_Entity.findUnique({ where: { id } });
  }

  async create(data: CreateEntityData): Promise<Entity> {
    return this.prisma.dashboard_Entity.create({ data });
  }

  async update(id: number, data: Partial<Entity>): Promise<Entity | null> {
    return this.prisma.dashboard_Entity.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Entity | null> {
    return this.prisma.dashboard_Entity.delete({ where: { id } });
  }

  async count(): Promise<number> {
    return this.prisma.dashboard_Entity.count();
  }
}
