import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { AssetRepository } from './asset.repository';

describe('AssetService', () => {
  let service: AssetService;
  let assetRepository: AssetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: AssetRepository,
          useValue: {
            countByType: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
    assetRepository = module.get<AssetRepository>(AssetRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the count of assets by type', async () => {
    const result = 5; // this should match the expected result
    jest
      .spyOn(assetRepository, 'countByType')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.countByType('type')).toBe(result);
  });

  it('should throw an error when the repository method throws an error', async () => {
    jest
      .spyOn(assetRepository, 'countByType')
      .mockImplementation(() => Promise.reject('Error'));

    await expect(service.countByType('type')).rejects.toThrow('Error');
  });
});
