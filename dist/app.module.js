"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const database_1 = require("./common/database");
const jobs_module_1 = require("./jobs/jobs.module");
const scheduler_module_1 = require("./scheduler/scheduler.module");
const email_module_1 = require("./email/email.module");
const cleanup_module_1 = require("./cleanup/cleanup.module");
const report_module_1 = require("./report/report.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(database_1.typeOrmConfig),
            schedule_1.ScheduleModule.forRoot(),
            jobs_module_1.JobsModule,
            scheduler_module_1.SchedulerModule,
            email_module_1.EmailModule,
            cleanup_module_1.CleanupModule,
            report_module_1.ReportModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map