import { Module } from '@nestjs/common';
import { ObjectiveModule } from './objectives/objective.module';
import { KeyResultsModule } from './key-results/key-results.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ObjectiveModule,
    KeyResultsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
