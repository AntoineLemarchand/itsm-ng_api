import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../dashboard/dashboard.service';
import { AssetService } from '../asset/asset.service';

describe('DashboardService', () => {
  let service: DashboardService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error for unsupported statType', async () => {
    const query = { statType: 'Ticket', statSelection: '{}' };
    await expect(service.count(query)).rejects.toThrow(`Type ${query.statType} is not supported`);
  });

  it('should call countByType for supported statType', async () => {
    const query = { statType: 'Other', statSelection: '{}' };
    const countByTypeSpy = jest.spyOn(service['assetService'], 'countByType');
    await service.count(query);
    expect(countByTypeSpy).toHaveBeenCalledWith(JSON.parse(query.statSelection));
  });
});