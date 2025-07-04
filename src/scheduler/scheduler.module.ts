import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { JobsModule } from '../jobs/jobs.module';
import { EmailModule } from '../email/email.module';
import { CleanupModule } from '../cleanup/cleanup.module';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [JobsModule, EmailModule, CleanupModule, ReportModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
