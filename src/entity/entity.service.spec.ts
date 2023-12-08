import { Test, TestingModule } from '@nestjs/testing';
import { EntityService } from './entity.service';
import { EntityModule } from './entity.module';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EntityModule],
    }).compile();

    service = module.get<EntityService>(EntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all entities', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should find an entity by id', async () => {
    const result = { id: 1, name: 'test', parentId: null };
    jest.spyOn(service, 'findById').mockResolvedValue(result);

    expect(await service.findById(1)).toBe(result);
  });

  it('should count entities', async () => {
    const result = 1;
    jest.spyOn(service, 'count').mockResolvedValue(result);

    expect(await service.count()).toBe(result);
  });
});
