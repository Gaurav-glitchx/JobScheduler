import { Module } from '@nestjs/common';
import { CleanupDataService } from './cleanup-data.service';

@Module({
  providers: [CleanupDataService],
  exports: [CleanupDataService],
})
export class CleanupModule {}
