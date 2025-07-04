"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const job_service_1 = require("./job.service");
const job_entity_1 = require("./entity/job.entity");
const job_dto_1 = require("./dto/job.dto");
let JobController = class JobController {
    jobService;
    constructor(jobService) {
        this.jobService = jobService;
    }
    async create(data) {
        return this.jobService.createJob(data);
    }
    async findAll() {
        return this.jobService.findAll();
    }
    async findById(id) {
        return this.jobService.findById(id);
    }
    async update(id, data) {
        return this.jobService.updateJob(id, data);
    }
    async delete(id) {
        await this.jobService.deleteJob(id);
        return { success: true, id };
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new job',
        description: 'Creates a new job with the specified type, schedule, recurrence, and metadata.',
    }),
    (0, swagger_1.ApiBody)({ type: job_dto_1.CreateJobDto, description: 'Job creation payload' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The job has been successfully created.',
        type: job_entity_1.Job,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all jobs',
        description: 'Returns a list of all jobs.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of jobs', type: [job_entity_1.Job] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a job by ID',
        description: 'Returns a job by its unique ID.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Job ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The job with the given ID',
        type: job_entity_1.Job,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a job',
        description: 'Updates the specified fields of a job.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Job ID' }),
    (0, swagger_1.ApiBody)({ type: job_dto_1.UpdateJobDto, description: 'Fields to update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The updated job', type: job_entity_1.Job }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a job',
        description: 'Deletes a job by its unique ID.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Job ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Job deleted successfully',
        schema: { example: { success: true, id: 1 } },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "delete", null);
exports.JobController = JobController = __decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map