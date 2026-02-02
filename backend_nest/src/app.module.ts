import { Module } from '@nestjs/common';
import { ObjectiveModule } from './objectives/objective.module';
import { KeyResultsModule } from './key-results/key-results.module';

@Module({
  imports: [ObjectiveModule, KeyResultsModule],
})
export class AppModule {}
