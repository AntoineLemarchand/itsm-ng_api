import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { AssetModule } from 'src/asset/asset.module';

@Module({
  imports: [AssetModule],
  controllers: [DashboardController],
})
export class DashboardModule { }
