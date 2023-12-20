import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Cache } from 'cache-manager';

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
