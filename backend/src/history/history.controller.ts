import { Controller, Delete, Get } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}
  @Get()
  getHistory() {
    return this.historyService.getHistory();
  }

  @Delete()
  deleteAll() {
    return this.historyService.deleteHistory();
  }
}
