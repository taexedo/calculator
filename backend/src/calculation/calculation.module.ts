import { Module } from '@nestjs/common';
import { CalculationController } from './calculation.controller';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [HistoryModule],
  controllers: [CalculationController],
})
export class CalculationModule {}
