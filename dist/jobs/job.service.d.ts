import { Repository } from 'typeorm';
import { Job, JobStatus } from './entity/job.entity';
export declare class JobService {
    private readonly jobRepository;
    constructor(jobRepository: Repository<Job>);
    createJob(data: Partial<Job>): Promise<Job>;
    findAll(): Promise<Job[]>;
    findById(id: number): Promise<Job | null>;
    updateJob(id: number, data: Partial<Job>): Promise<Job | null>;
    findDueJobs(now: Date): Promise<Job[]>;
    lockJob(id: number): Promise<boolean>;
    markJobExecuted(id: number, status: JobStatus): Promise<void>;
    deleteJob(id: number): Promise<void>;
}
