/**
 * ---------------------------------------------------------------------
 * ITSM-NG
 * Copyright (C) 2024 ITSM-NG and contributors.
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

import { Inject, Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';

@Injectable()
export class EntityService {
  constructor(
    @Inject(EntityRepository)
    private readonly entityRepository: EntityRepository,
  ) {}

  async findAll() {
    return await this.entityRepository.findAll();
  }

  async findById(id: number) {
    return await this.entityRepository.findById(id);
  }

  async count() {
    return await this.entityRepository.count();
  }
}
