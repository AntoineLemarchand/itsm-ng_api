import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [PassportModule, CacheModule.register()],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
