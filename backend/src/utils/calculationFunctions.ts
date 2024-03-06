import Decimal from 'decimal.js';
import { HttpException } from '@nestjs/common';

export function addition(number1: string, number2: string): string {
  return new Decimal(number1).plus(new Decimal(number2)).toString();
}

export function subtraction(number1: string, number2: string): string {
  return new Decimal(number1).minus(new Decimal(number2)).toString();
}

export function division(number1: string, number2: string): string {
  if (new Decimal(number2).equals(0)) {
    throw new HttpException('Cannot divide by zero', 400);
  }
  return new Decimal(number1).dividedBy(new Decimal(number2)).toString();
}

export function multiplication(number1: string, number2: string): string {
  return new Decimal(number1).times(new Decimal(number2)).toString();
}
