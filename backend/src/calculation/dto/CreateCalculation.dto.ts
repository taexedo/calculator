import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalculationDto {
  @IsNotEmpty()
  @IsString()
  expression: string;
}
