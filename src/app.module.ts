import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { typeOrmConfig } from './common/database';
import { JobsModule } from './jobs/jobs.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { EmailModule } from './email/email.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    JobsModule,
    SchedulerModule,
    EmailModule,
    CleanupModule,
    ReportModule,
  ],
})
export class AppModule {}
