import { Module } from '@nestjs/common';
import ObjectiveController from './objective.controller';
import ObjectiveService from './objective.service';
import { PrismaService } from '../prisma.service';
import { SchedulerModule } from '../scheduler/scheduler.module';

@Module({
  imports: [SchedulerModule],
  controllers: [ObjectiveController],
  providers: [ObjectiveService, PrismaService],
})
export class ObjectiveModule { }
