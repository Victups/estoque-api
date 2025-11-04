import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { Dashboard } from './entities/dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard])],
  controllers: [DashboardsController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
