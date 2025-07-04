import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job } from './entity/job.entity';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';

/**
 * Controller for managing jobs via HTTP endpoints.
 * Provides endpoints to create, read, update, and delete jobs.
 */
@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  /**
   * Creates a new job with the specified type, schedule, recurrence, and metadata.
   * This is how you add new work for the scheduler to pick up.
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new job',
    description:
      'Creates a new job with the specified type, schedule, recurrence, and metadata.',
  })
  @ApiBody({ type: CreateJobDto, description: 'Job creation payload' })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
    type: Job,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateJobDto) {
    return this.jobService.createJob(data);
  }

  /**
   * Returns a list of all jobs in the system.
   * Useful for monitoring and debugging.
   */
  @Get()
  @ApiOperation({
    summary: 'Get all jobs',
    description: 'Returns a list of all jobs.',
  })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  async findAll() {
    return this.jobService.findAll();
  }

  /**
   * Returns a job by its unique ID.
   * Use this to check the status or details of a specific job.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a job by ID',
    description: 'Returns a job by its unique ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'The job with the given ID',
    type: Job,
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async findById(@Param('id') id: number) {
    return this.jobService.findById(id);
  }

  /**
   * Updates the specified fields of a job.
   * Use this to change the schedule, metadata, or other properties.
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a job',
    description: 'Updates the specified fields of a job.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Job ID' })
  @ApiBody({ type: UpdateJobDto, description: 'Fields to update' })
  @ApiResponse({ status: 200, description: 'The updated job', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async update(@Param('id') id: number, @Body() data: UpdateJobDto) {
    return this.jobService.updateJob(id, data);
  }

  /**
   * Deletes a job by its unique ID.
   * Use this to remove jobs you no longer want to run.
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a job',
    description: 'Deletes a job by its unique ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Job deleted successfully',
    schema: { example: { success: true, id: 1 } },
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id') id: number,
  ): Promise<{ success: boolean; id: number }> {
    await this.jobService.deleteJob(id);
    return { success: true, id };
  }
}
