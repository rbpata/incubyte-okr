import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';

interface EmailJob {
    objectiveTitle: string;
    objectiveId: number;
}

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);
    private emailQueue: EmailJob[] = [];

    constructor(private emailService: EmailService) { }

    addEmailJob(objectiveTitle: string, objectiveId: number) {
        this.emailQueue.push({ objectiveTitle, objectiveId });
        this.logger.log(`Email job queued for: ${objectiveTitle} (ID: ${objectiveId})`);
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async processEmailQueue() {
        if (this.emailQueue.length === 0) {
            return;
        }

        this.logger.log(`Processing ${this.emailQueue.length} email(s)...`);

        const jobsToProcess = [...this.emailQueue];
        this.emailQueue = [];

        for (const job of jobsToProcess) {
            try {
                this.logger.log(`Sending email for: ${job.objectiveTitle} (ID: ${job.objectiveId})`);

                await this.emailService.sendObjectiveCreatedEmail(
                    job.objectiveTitle,
                    job.objectiveId
                );

                this.logger.log(`Email sent successfully for ID: ${job.objectiveId}`);
            } catch (error) {
                this.logger.error(
                    `Failed to send email for ${job.objectiveTitle}: ${error.message}`,
                    error.stack
                );
            }
        }
    }
}
