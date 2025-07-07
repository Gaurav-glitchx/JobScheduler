import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, IsNull, Not } from 'typeorm';
import { Job, JobStatus } from './entity/job.entity';
import { CronTime } from 'cron';

/**
 * Service responsible for all job-related database operations and business logic.
 * Handles creating, updating, finding, locking, and marking jobs as executed.
 */
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  /**
   * Creates a new job in the database.
   * The job can be of any type, as defined by its metadata.
   */
  async createJob(data: Partial<Job>): Promise<Job> {
    const job = this.jobRepository.create(data);
    return this.jobRepository.save(job);
  }

  /**
   * Returns all jobs in the system.
   */
  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  /**
   * Finds a job by its unique ID.
   * Returns null if not found.
   */
  async findById(id: number): Promise<Job | null> {
    return this.jobRepository.findOneBy({ id });
  }

  /**
   * Updates a job with new data and returns the updated job.
   */
  async updateJob(id: number, data: Partial<Job>): Promise<Job | null> {
    await this.jobRepository.update(id, data);
    return this.findById(id);
  }

  /**
   * Finds all jobs that are due to run right now.
   * Only jobs that are not locked, are pending, and whose schedule matches the current time are returned.
   */
  async findDueJobs(now: Date): Promise<Job[]> {
    const jobs = await this.jobRepository.find({
      where: [{ lockedAt: IsNull(), status: 'pending' }],
    });
    return jobs.filter((job) => {
      try {
        const cronTime = new CronTime(job.schedule);
        const nextRun = cronTime
          .getNextDateFrom(job.lastRunAt || new Date(0))
          .toJSDate();
        return nextRun.getTime() <= now.getTime();
      } catch (e) {
        return false;
      }
    });
  }

  /**
   * Attempts to lock a job so that only one worker can run it at a time.
   * This prevents two servers from picking up and running the same job simultaneously.
   * Returns true if the lock was successful, false otherwise.
   */
  async lockJob(id: number): Promise<boolean> {
    const result = await this.jobRepository.update(
      { id, lockedAt: IsNull() },
      { lockedAt: new Date(), status: 'running' },
    );
    return result.affected === 1;
  }

  /**
   * Marks a job as executed, updating its status and last run time.
   * If the job is recurring, its status will be reset elsewhere.
   */
  async markJobExecuted(id: number, status: JobStatus): Promise<void> {
    await this.jobRepository.update(id, {
      lastRunAt: new Date(),
      status,
      lockedAt: null,
    });
  }

  /**
   * Deletes a job from the database by its ID.
   */
  async deleteJob(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
