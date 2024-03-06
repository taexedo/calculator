import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isValidExpression } from '../utils/checkers';

@Injectable()
export class CalculationValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { expression } = req.body;
    const isValid = isValidExpression(expression);
    if (!isValid) {
      return res.status(400).send({ message: 'Invalid calculation format.' });
    }
    next();
  }
}
