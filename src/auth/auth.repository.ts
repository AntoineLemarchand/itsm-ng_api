import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Cache } from 'cache-manager';

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

const prisma = new PrismaClient();

export class AuthRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getApiKey(): Promise<string> {
    const apiKey = await this.cacheManager.get<string>('apiKey');
    if (apiKey) {
      return apiKey;
    }

    const newApiKey = await prisma.glpi_configs.findFirst({
      where: {
        context: 'core',
        name: 'dashboard_api_token',
      },
    });

    await this.cacheManager.set('apiKey', newApiKey.value, 10000);

    return newApiKey.value;
  }
}
