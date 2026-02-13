import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [ScheduleModule.forRoot(), EmailModule],
    providers: [SchedulerService],
    exports: [SchedulerService],
})
export class SchedulerModule { }
