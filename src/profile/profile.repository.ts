/**
 * ---------------------------------------------------------------------
 * ITSM-NG
 * Copyright (C) 2022 ITSM-NG and contributors.
 *
 * https://www.itsm-ng.org
 *
 * ---------------------------------------------------------------------
 *
 * LICENSE
 *
 * This file is part of ITSM-NG.
 *
 * ITSM-NG is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * ITSM-NG is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ITSM-NG. If not, see <http://www.gnu.org/licenses/>.
 * ---------------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type Profile = Prisma.Dashboard_ProfileGetPayload<Record<string, unknown>>;
type CreateProfileData = Prisma.Dashboard_ProfileCreateInput;

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
