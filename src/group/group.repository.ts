import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type Group = Prisma.Dashboard_GroupGetPayload<Record<string, unknown>>;
type CreateGroupData = Omit<Prisma.Dashboard_GroupCreateInput, 'id'>;

@Injectable()
export class GroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Group[]> {
    return this.prisma.dashboard_Group.findMany();
  }

  async findById(id: number): Promise<Group | null> {
    return this.prisma.dashboard_Group.findUnique({
      where: { id },
    });
  }

  async create(data: CreateGroupData): Promise<Group> {
    return this.prisma.dashboard_Group.create({ data });
  }

  async update(id: number, data: CreateGroupData): Promise<Group | null> {
    return this.prisma.dashboard_Group.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Group | null> {
    return this.prisma.dashboard_Group.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.dashboard_Group.count();
  }
}
