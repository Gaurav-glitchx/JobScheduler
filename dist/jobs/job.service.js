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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entity/job.entity");
let JobService = class JobService {
    jobRepository;
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async createJob(data) {
        const job = this.jobRepository.create(data);
        return this.jobRepository.save(job);
    }
    async findAll() {
        return this.jobRepository.find();
    }
    async findById(id) {
        return this.jobRepository.findOneBy({ id });
    }
    async updateJob(id, data) {
        await this.jobRepository.update(id, data);
        return this.findById(id);
    }
    async findDueJobs(now) {
        return this.jobRepository.find({
            where: [
                { lockedAt: (0, typeorm_2.IsNull)(), status: 'pending' },
                { lockedAt: (0, typeorm_2.IsNull)(), status: 'running' },
            ],
        });
    }
    async lockJob(id) {
        const result = await this.jobRepository.update({ id, lockedAt: (0, typeorm_2.IsNull)() }, { lockedAt: new Date(), status: 'running' });
        return result.affected === 1;
    }
    async markJobExecuted(id, status) {
        await this.jobRepository.update(id, {
            lastRunAt: new Date(),
            status,
            lockedAt: null,
        });
    }
    async deleteJob(id) {
        await this.jobRepository.delete(id);
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobService);
//# sourceMappingURL=job.service.js.map