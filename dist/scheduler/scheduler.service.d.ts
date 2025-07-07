import { JobService } from '../jobs/job.service';
import { Job } from '../jobs/job.entity';
import { SendEmailService } from '../email/send-email.service';
import { CleanupDataService } from '../cleanup/cleanup-data.service';
import { GenerateReportService } from '../report/generate-report.service';
export declare class SchedulerService {
    private readonly jobService;
    private readonly sendEmailService;
    private readonly cleanupDataService;
    private readonly generateReportService;
    private readonly logger;
    constructor(jobService: JobService, sendEmailService: SendEmailService, cleanupDataService: CleanupDataService, generateReportService: GenerateReportService);
    pollJobs(): Promise<void>;
    executeJob(job: Job): Promise<void>;
}
