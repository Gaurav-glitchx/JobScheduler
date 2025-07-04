import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CleanupDataService {
  private readonly logger = new Logger(CleanupDataService.name);

  async handle(metadata: any) {
    const table = metadata?.table || 'unknown';
    const olderThan = metadata?.olderThan || null;

    this.logger.log(`Starting cleanup for table: ${table}${olderThan ? `, removing records older than ${olderThan}` : ''}`);

    const deletedCount = await this.cleanupTable(table, olderThan);

    this.logger.log(`Cleanup complete for table: ${table}. Deleted ${deletedCount} records.`);
  }

  private async cleanupTable(table: string, olderThan: string | null): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Math.floor(Math.random() * 100);
  }
}