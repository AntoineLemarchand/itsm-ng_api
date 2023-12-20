import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {

    constructor(
        @Inject(AuthRepository) private authRepository: AuthRepository,
    ) {}

    async validateApiKey(apiKey: string): Promise<boolean> {
        return apiKey == await this.authRepository.getApiKey();
    }
}
