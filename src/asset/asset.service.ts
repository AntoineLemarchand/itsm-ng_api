import { Inject, Injectable } from '@nestjs/common';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
  constructor(
    @Inject(AssetRepository) private assetRepository: AssetRepository,
  ) {}

  async findAll() {
    return await this.assetRepository.findAll();
  }

  async findById(id: number) {
    return await this.assetRepository.findById(id);
  }

  async getByName(name: string) {
    return await this.assetRepository.getByName(name);
  }

  async count() {
    return await this.assetRepository.count();
  }

  async countByType(selection: object = {}) {
    try {
      return await this.assetRepository.countFromSelection(selection);
    } catch (error) {
      throw new Error(error);
    }
  }
}
