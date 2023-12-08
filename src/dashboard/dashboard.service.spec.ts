import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { AssetService } from '../asset/asset.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let assetService: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: AssetService,
          useValue: {
            countByType: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    assetService = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the count of assets by type', async () => {
    const result = 5; // this should match the expected result
    jest
      .spyOn(assetService, 'countByType')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.countByType('type')).toBe(result);
  });

  it('should throw an error for unsupported types', async () => {
    const unsupportedTypes = ['Ticket', 'Entity', 'Profile', 'Group', 'User'];

    for (const type of unsupportedTypes) {
      await expect(service.countByType(type)).rejects.toThrow(
        `Type ${type} is not supported`,
      );
    }
  });
});
