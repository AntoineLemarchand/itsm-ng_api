import { Inject, Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async findAll() {
    return await this.profileRepository.findAll();
  }

  async findById(id: number) {
    return await this.profileRepository.findById(id);
  }

  async count() {
    return await this.profileRepository.count();
  }
}
