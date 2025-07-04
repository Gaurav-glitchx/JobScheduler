import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from '../common/config';

@Injectable()
export class SendEmailService {
  private readonly logger = new Logger(SendEmailService.name);

  private readonly transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  async handle(metadata: any) {
    const to = metadata?.to;
    const subject = metadata?.subject;
    const body = metadata?.body || '';

    if (!to || !subject) {
      this.logger.error('Missing required email fields: to or subject');
      throw new BadRequestException(
        'Missing required email fields: to or subject',
      );
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.smtp.from,
        to,
        subject,
        text: body,
      });
      this.logger.log(
        `Email sent to ${to} successfully. MessageId: ${info.messageId}`,
      );
      return { success: true, to, subject, messageId: info.messageId };
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`);
      throw new BadRequestException('Failed to send email: ' + error.message);
    }
  }
}
