"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const common_1 = require("@nestjs/common");
const scheduler_service_1 = require("./scheduler.service");
const jobs_module_1 = require("../jobs/jobs.module");
const email_module_1 = require("../email/email.module");
const cleanup_module_1 = require("../cleanup/cleanup.module");
const report_module_1 = require("../report/report.module");
let SchedulerModule = class SchedulerModule {
};
exports.SchedulerModule = SchedulerModule;
exports.SchedulerModule = SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [jobs_module_1.JobsModule, email_module_1.EmailModule, cleanup_module_1.CleanupModule, report_module_1.ReportModule],
        providers: [scheduler_service_1.SchedulerService],
    })
], SchedulerModule);
//# sourceMappingURL=scheduler.module.js.map