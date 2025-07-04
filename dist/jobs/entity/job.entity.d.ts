export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';
export declare class Job {
    id: number;
    name: string;
    schedule: string;
    isRecurring: boolean;
    lastRunAt: Date;
    status: JobStatus;
    lockedAt: Date | null;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
