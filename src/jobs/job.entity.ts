import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

@Entity('jobs')
export class Job {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'sendEmail' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: '* * * * *', description: 'Cron schedule' })
  @Column({ type: 'varchar', length: 255 })
  schedule: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: false })
  isRecurring: boolean;

  @ApiProperty({ example: '2024-06-01T12:00:00Z', required: false })
  @Column({ type: 'timestamp', nullable: true })
  lastRunAt: Date;

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'running', 'completed', 'failed'],
  })
  @Column({ type: 'varchar', length: 32, default: 'pending' })
  status: JobStatus;

  @ApiProperty({ example: '2024-06-01T12:00:00Z', required: false })
  @Column({ type: 'timestamp', nullable: true })
  lockedAt: Date | null;

  @ApiProperty({
    example: { to: 'user@example.com', subject: 'Hello' },
    required: false,
    type: Object,
  })
  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @ApiProperty({ example: 0 })
  @Column({ type: 'int', default: 0 })
  retryCount: number;

  @ApiProperty({ example: 'Error message', required: false })
  @Column({ type: 'text', nullable: true })
  lastError: string | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
