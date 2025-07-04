import { JobService } from './job.service';
import { Job } from './entity/job.entity';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    create(data: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    findById(id: number): Promise<Job | null>;
    update(id: number, data: UpdateJobDto): Promise<Job | null>;
    delete(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
}
