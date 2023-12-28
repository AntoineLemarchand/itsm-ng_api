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
