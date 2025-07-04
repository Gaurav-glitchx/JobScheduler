import { Module } from '@nestjs/common';
import { GenerateReportService } from './generate-report.service';

@Module({
  providers: [GenerateReportService],
  exports: [GenerateReportService],
})
export class ReportModule {}
