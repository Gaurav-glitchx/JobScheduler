import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { JobService } from '../jobs/job.service';
import { Job } from '../jobs/entity/job.entity';
import { SendEmailService } from '../email/send-email.service';
import { CleanupDataService } from '../cleanup/cleanup-data.service';
import { GenerateReportService } from '../report/generate-report.service';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);
  private poller: CronJob;

  constructor(
    private readonly jobService: JobService,
    private readonly sendEmailService: SendEmailService,
    private readonly cleanupDataService: CleanupDataService,
    private readonly generateReportService: GenerateReportService,
  ) {}
/**
 * Initializes the scheduler service by starting the poller.    
 */
  onModuleInit() {
    this.poller = new CronJob('* * * * *', () => this.pollJobs());
    this.poller.start();
    this.logger.log('Job scheduler poller started (every minute)');
  }
/**
 * Polls for due jobs every minute.
 * It checks for jobs that are due to be executed based on their schedule.
 * If a job is found, it attempts to lock it and execute it.
 * If the job is successfully locked, it calls executeJob to handle the job logic.
 * If the job fails, it marks the job as failed.
 * If the job is recurring, it resets the job status to pending.
 */
  async pollJobs() {
    const now = new Date();
    const jobs = await this.jobService.findDueJobs(now);
    for (const job of jobs) {
      if (await this.jobService.lockJob(job.id)) {
        this.logger.log(`Locked and executing job: ${job.id} (${job.name})`);
        this.executeJob(job).catch((err) => {
          this.logger.error(`Job ${job.id} failed: ${err}`);
          this.jobService.markJobExecuted(job.id, 'failed');
        });
      }
    }
  }
/**
 * 
 * @param job The job to execute.
 * Executes the job based on its type and metadata.
 * If the job is successful, it marks the job as completed.
 * If the job fails, it marks the job as failed.
 * If the job is recurring, it resets the job status to pending.
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
      await this.jobService.markJobExecuted(job.id, 'completed');
      if (job.isRecurring) {
        await this.jobService.updateJob(job.id, { status: 'pending' });
      }
    } catch (err) {
      await this.jobService.markJobExecuted(job.id, 'failed');
      throw err;
    }
  }
}
