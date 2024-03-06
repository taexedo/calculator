import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}
  @Get()
  getHistory() {
    return this.historyService.getHistory();
  }
}