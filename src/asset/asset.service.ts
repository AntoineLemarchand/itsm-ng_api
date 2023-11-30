import { Inject, Injectable } from '@nestjs/common';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
    constructor(
        @Inject(AssetRepository) private assetRepository: AssetRepository,
    ) {}

    async countByType(type: string) {
        return await this.assetRepository.countByType(type);
    }
}
