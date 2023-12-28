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

type Group = Prisma.Dashboard_GroupGetPayload<Record<string, unknown>>;
type CreateGroupData = Prisma.Dashboard_GroupCreateInput;

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
