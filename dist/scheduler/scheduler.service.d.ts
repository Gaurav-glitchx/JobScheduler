import { OnModuleInit } from '@nestjs/common';
import { JobService } from '../jobs/job.service';
import { Job } from '../jobs/entity/job.entity';
import { SendEmailService } from '../email/send-email.service';
import { CleanupDataService } from '../cleanup/cleanup-data.service';
import { GenerateReportService } from '../report/generate-report.service';
export declare class SchedulerService implements OnModuleInit {
    private readonly jobService;
    private readonly sendEmailService;
    private readonly cleanupDataService;
    private readonly generateReportService;
    private readonly logger;
    private poller;
    constructor(jobService: JobService, sendEmailService: SendEmailService, cleanupDataService: CleanupDataService, generateReportService: GenerateReportService);
    onModuleInit(): void;
    pollJobs(): Promise<void>;
    executeJob(job: Job): Promise<void>;
}
