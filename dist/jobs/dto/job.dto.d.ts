export declare class CreateJobDto {
    name: string;
    schedule: string;
    isRecurring: boolean;
    metadata?: Record<string, any>;
}
declare const UpdateJobDto_base: import("@nestjs/common").Type<Partial<CreateJobDto>>;
export declare class UpdateJobDto extends UpdateJobDto_base {
}
export {};
