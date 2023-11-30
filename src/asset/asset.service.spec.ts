import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { AssetModule } from './asset.module';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AssetModule],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});