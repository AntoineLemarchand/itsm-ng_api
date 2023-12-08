import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: ProfileRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all profiles', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should find a profile by id', async () => {
    const result = { id: 1, name: 'test' };
    jest.spyOn(service, 'findById').mockResolvedValue(result);

    expect(await service.findById(1)).toBe(result);
  });

  it('should count profiles', async () => {
    const result = 1;
    jest.spyOn(service, 'count').mockResolvedValue(result);

    expect(await service.count()).toBe(result);
  });
});
