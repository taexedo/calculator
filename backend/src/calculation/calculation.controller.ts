import { Body, Controller, Post } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import {
  addition,
  division,
  multiplication,
  subtraction,
} from '../utils/calculationFunctions';
import { CreateCalculationDto } from './dto/CreateCalculation.dto';

@Controller('calculation')
export class CalculationController {
  constructor(private historyService: HistoryService) {}

  @Post()
  async createCalculation(@Body() createCalculationDto: CreateCalculationDto) {
    const [firstOperand, operation, secondOperand] =
      createCalculationDto.expression.split(' ');
    const operationFunctionMapper = {
      '+': addition,
      '-': subtraction,
      '/': division,
      '*': multiplication,
    };
    const result = operationFunctionMapper[operation](
      firstOperand,
      secondOperand,
    );

    const createHistoryDto = {
      expression: createCalculationDto.expression,
      result,
    };
    await this.historyService.createHistory(createHistoryDto);
    return { result };
  }
}
