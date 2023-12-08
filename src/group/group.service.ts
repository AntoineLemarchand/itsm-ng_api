import { Inject, Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    @Inject(GroupRepository) private readonly groupRepository: GroupRepository,
  ) {}

  async findAll() {
    return await this.groupRepository.findAll();
  }

  async findById(id: number) {
    return await this.groupRepository.findById(id);
  }

  async count() {
    return await this.groupRepository.count();
  }
}
