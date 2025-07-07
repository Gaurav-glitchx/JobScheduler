import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobService } from '../jobs/job.service';
import { Job } from '../jobs/job.entity';
import { SendEmailService } from '../email/send-email.service';
import { CleanupDataService } from '../cleanup/cleanup-data.service';
import { GenerateReportService } from '../report/generate-report.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly jobService: JobService,
    private readonly sendEmailService: SendEmailService,
    private readonly cleanupDataService: CleanupDataService,
    private readonly generateReportService: GenerateReportService,
  ) {}

  /**
   * Polls for due jobs every minute using NestJS's @Cron decorator.
   */
  @Cron('* * * * *')
  async pollJobs() {
    const now = new Date();
    const jobs = await this.jobService.findDueJobs(now);
    for (const job of jobs) {
      if (await this.jobService.lockJob(job.id)) {
        this.logger.log(`Locked and executing job: ${job.id} (${job.name})`);
        this.executeJob(job).catch((err) => {
          this.logger.error(`Job ${job.id} failed: ${err}`);
        });
      }
    }
  }

  /**
   * Executes a job and handles automatic retry logic.
   * Retries up to 3 times before marking as failed.
   */
  async executeJob(job: Job) {
    try {
      switch (job.name) {
        case 'sendEmail':
          await this.sendEmailService.handle(job.metadata);
          break;
        case 'cleanupData':
          await this.cleanupDataService.handle(job.metadata);
          break;
        case 'generateReport':
          await this.generateReportService.handle(job.metadata);
          break;
        default:
          this.logger.warn(`Unknown job type: ${job.name}`);
      }
      await this.jobService.updateJob(job.id, {
        status: 'completed',
        retryCount: 0,
        lastError: null,
      });
      if (job.isRecurring) {
        await this.jobService.updateJob(job.id, { status: 'pending' });
      }
    } catch (err) {
      const retryCount = (job.retryCount || 0) + 1;
      const maxRetries = 3;
      if (retryCount < maxRetries) {
        this.logger.warn(
          `Job ${job.id} failed (attempt ${retryCount}/${maxRetries}), will retry.`,
        );
        await this.jobService.updateJob(job.id, {
          status: 'pending',
          retryCount,
          lastError: err.message || String(err),
          lockedAt: null,
        });
      } else {
        this.logger.error(
          `Job ${job.id} failed after ${retryCount} attempts, marking as failed.`,
        );
        await this.jobService.updateJob(job.id, {
          status: 'failed',
          retryCount,
          lastError: err.message || String(err),
          lockedAt: null,
        });
      }
    }
  }
}
