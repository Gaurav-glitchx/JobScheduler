import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'sendEmail' })
  name: string;

  @ApiProperty({ example: '* * * * *', description: 'Cron schedule' })
  schedule: string;

  @ApiProperty({ example: true })
  isRecurring: boolean;

  @ApiProperty({
    example: { to: 'user@example.com', subject: 'Hello' },
    required: false,
    type: Object,
  })
  metadata?: Record<string, any>;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {}
