import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ObjectiveModule } from './objectives/objective.module';
import { KeyResultsModule } from './key-results/key-results.module';
import { ConfigModule } from '@nestjs/config';
import AuthMiddleware from './common/middlewares/auth.middleware';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ObjectiveModule,
    KeyResultsModule,
    SchedulerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('okr');
  }
}
