import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepository } from '../dashboard.repository';

describe('DashboardRepository', () => {
    let controller: DashboardRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DashboardRepository],
        }).compile();

        controller = module.get<DashboardRepository>(DashboardRepository);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

