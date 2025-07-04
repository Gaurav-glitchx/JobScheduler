"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const cron_1 = require("cron");
const job_service_1 = require("../jobs/job.service");
const send_email_service_1 = require("../email/send-email.service");
const cleanup_data_service_1 = require("../cleanup/cleanup-data.service");
const generate_report_service_1 = require("../report/generate-report.service");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    jobService;
    sendEmailService;
    cleanupDataService;
    generateReportService;
    logger = new common_1.Logger(SchedulerService_1.name);
    poller;
    constructor(jobService, sendEmailService, cleanupDataService, generateReportService) {
        this.jobService = jobService;
        this.sendEmailService = sendEmailService;
        this.cleanupDataService = cleanupDataService;
        this.generateReportService = generateReportService;
    }
    onModuleInit() {
        this.poller = new cron_1.CronJob('* * * * *', () => this.pollJobs());
        this.poller.start();
        this.logger.log('Job scheduler poller started (every minute)');
    }
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
    async executeJob(job) {
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
        }
        catch (err) {
            await this.jobService.markJobExecuted(job.id, 'failed');
            throw err;
        }
    }
};
exports.SchedulerService = SchedulerService;
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [job_service_1.JobService,
        send_email_service_1.SendEmailService,
        cleanup_data_service_1.CleanupDataService,
        generate_report_service_1.GenerateReportService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map