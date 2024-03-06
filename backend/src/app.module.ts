import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './history/history.module';
import { CalculationModule } from './calculation/calculation.module';
import * as process from 'process';
import { CalculationValidationMiddleware } from './middleware/validator.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@hedgeserv.gu7sy1t.mongodb.net/HedgeServe`,
    ),
    HistoryModule,
    CalculationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/browser'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CalculationValidationMiddleware)
      .forRoutes({ path: 'calculation', method: RequestMethod.POST });
  }
}
