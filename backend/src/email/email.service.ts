import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
        });
    }

    async sendObjectiveCreatedEmail(objectiveTitle: string, objectiveId: number) {
        const notificationEmail = this.configService.get<string>('NOTIFICATION_EMAIL');
        const emailFrom = this.configService.get<string>('EMAIL_FROM');

        try {
            const info = await this.transporter.sendMail({
                from: `"OKR System" <${emailFrom}>`,
                to: notificationEmail,
                subject: 'New Objective Created',
                text: `You have created a new objective.\n\nTitle: ${objectiveTitle}\nID: ${objectiveId}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2563eb;">New Objective Created</h2>
                        <p>You have created a new objective.</p>
                        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 5px 0;"><strong>Title:</strong> ${objectiveTitle}</p>
                            <p style="margin: 5px 0;"><strong>ID:</strong> ${objectiveId}</p>
                        </div>
                    </div>
                `,
            });

            this.logger.log(`Email sent successfully: ${info.messageId}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            this.logger.error(`Failed to send email: ${error.message}`, error.stack);
            return { success: false, error: error.message };
        }
    }
}
