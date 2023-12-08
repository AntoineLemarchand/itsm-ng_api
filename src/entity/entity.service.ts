import { Inject, Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';

@Injectable()
export class EntityService {
  constructor(
    @Inject(EntityRepository)
    private readonly entityRepository: EntityRepository,
  ) {}

  async findAll() {
    return await this.entityRepository.findAll();
  }

  async findById(id: number) {
    return await this.entityRepository.findById(id);
  }

  async count() {
    return await this.entityRepository.count();
  }
}
