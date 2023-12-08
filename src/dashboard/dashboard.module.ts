import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { AssetModule } from '../asset/asset.module';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [AssetModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
