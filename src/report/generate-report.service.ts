import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GenerateReportService {
  private readonly logger = new Logger(GenerateReportService.name);

  async handle(metadata: any) {
    const reportType = metadata?.reportType || 'default';
    const userId = metadata?.userId || 'unknown';

    this.logger.log(`Generating report: ${reportType} for user: ${userId}`);

    const reportData = this.createReport(reportType, userId);

    await this.saveReport(reportType, userId, reportData);

    this.logger.log(
      `Report ${reportType} for user ${userId} generated and saved.`,
    );
  }

  private createReport(reportType: string, userId: string) {
    return {
      generatedAt: new Date(),
      reportType,
      userId,
      data: [
        { metric: 'sales', value: 100 },
        { metric: 'visits', value: 250 },
      ],
    };
  }

  private async saveReport(
    reportType: string,
    userId: string,
    reportData: any,
  ) {
    this.logger.log(
      `Saving report for user ${userId}, type ${reportType}: ${JSON.stringify(reportData)}`,
    );
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
