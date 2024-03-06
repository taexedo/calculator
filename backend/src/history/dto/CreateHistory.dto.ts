import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCalculationDto } from '../../calculation/dto/CreateCalculation.dto';

export class CreateHistoryDto extends CreateCalculationDto {
  @IsNotEmpty()
  @IsString()
  result: string;
}
