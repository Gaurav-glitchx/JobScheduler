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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobDto = exports.CreateJobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateJobDto {
    name;
    schedule;
    isRecurring;
    metadata;
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sendEmail' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '* * * * *', description: 'Cron schedule' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreateJobDto.prototype, "isRecurring", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { to: 'user@example.com', subject: 'Hello' },
        required: false,
        type: Object,
    }),
    __metadata("design:type", Object)
], CreateJobDto.prototype, "metadata", void 0);
class UpdateJobDto extends (0, swagger_1.PartialType)(CreateJobDto) {
}
exports.UpdateJobDto = UpdateJobDto;
//# sourceMappingURL=job.dto.js.map