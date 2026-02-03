import { Module } from '@nestjs/common';
import ObjectiveController from './objective.controller';
import ObjectiveService from './objective.service';


@Module({
  controllers: [ObjectiveController],
  providers: [ObjectiveService],
})
export class ObjectiveModule {}