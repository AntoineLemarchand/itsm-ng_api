import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type Profile = Prisma.Dashboard_ProfileGetPayload<Record<string, unknown>>;
type CreateProfileData = Omit<Prisma.Dashboard_ProfileCreateInput, 'id'>;

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Profile[]> {
    return this.prisma.dashboard_Profile.findMany();
  }

  async findById(id: number): Promise<Profile | null> {
    return this.prisma.dashboard_Profile.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProfileData): Promise<Profile> {
    return this.prisma.dashboard_Profile.create({
      data,
    });
  }

  async update(id: number, data: CreateProfileData): Promise<Profile | null> {
    return this.prisma.dashboard_Profile.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Profile | null> {
    return this.prisma.dashboard_Profile.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.dashboard_Profile.count();
  }
}
