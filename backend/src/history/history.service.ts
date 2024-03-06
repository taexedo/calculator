import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from '../schemas/History.schema';
import { Model } from 'mongoose';
import { CreateHistoryDto } from './dto/CreateHistory.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModule: Model<History>,
  ) {}

  getHistory() {
    return this.historyModule.find();
  }

  createHistory(createHistoryDto: CreateHistoryDto) {
    const newHistory = new this.historyModule(createHistoryDto);
    return newHistory.save();
  }
}
