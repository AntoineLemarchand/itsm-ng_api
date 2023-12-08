import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repository';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: GroupRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all groups', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should find a group by id', async () => {
    const result = { id: 1, name: 'test', entityId: 1 };
    jest.spyOn(service, 'findById').mockResolvedValue(result);

    expect(await service.findById(1)).toBe(result);
  });

  it('should count groups', async () => {
    const result = 1;
    jest.spyOn(service, 'count').mockResolvedValue(result);

    expect(await service.count()).toBe(result);
  });
});
