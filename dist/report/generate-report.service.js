"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GenerateReportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateReportService = void 0;
const common_1 = require("@nestjs/common");
let GenerateReportService = GenerateReportService_1 = class GenerateReportService {
    logger = new common_1.Logger(GenerateReportService_1.name);
    async handle(metadata) {
        const reportType = metadata?.reportType || 'default';
        const userId = metadata?.userId || 'unknown';
        this.logger.log(`Generating report: ${reportType} for user: ${userId}`);
        const reportData = this.createReport(reportType, userId);
        await this.saveReport(reportType, userId, reportData);
        this.logger.log(`Report ${reportType} for user ${userId} generated and saved.`);
    }
    createReport(reportType, userId) {
        return {
            generatedAt: new Date(),
            reportType,
            userId,
            data: [
                { metric: 'sales', value: 100 },
                { metric: 'visits', value: 250 },
            ],
        };
    }
    async saveReport(reportType, userId, reportData) {
        this.logger.log(`Saving report for user ${userId}, type ${reportType}: ${JSON.stringify(reportData)}`);
        return new Promise((resolve) => setTimeout(resolve, 500));
    }
};
exports.GenerateReportService = GenerateReportService;
exports.GenerateReportService = GenerateReportService = GenerateReportService_1 = __decorate([
    (0, common_1.Injectable)()
], GenerateReportService);
//# sourceMappingURL=generate-report.service.js.map