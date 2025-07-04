"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CleanupDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanupDataService = void 0;
const common_1 = require("@nestjs/common");
let CleanupDataService = CleanupDataService_1 = class CleanupDataService {
    logger = new common_1.Logger(CleanupDataService_1.name);
    async handle(metadata) {
        const table = metadata?.table || 'unknown';
        const olderThan = metadata?.olderThan || null;
        this.logger.log(`Starting cleanup for table: ${table}${olderThan ? `, removing records older than ${olderThan}` : ''}`);
        const deletedCount = await this.cleanupTable(table, olderThan);
        this.logger.log(`Cleanup complete for table: ${table}. Deleted ${deletedCount} records.`);
    }
    async cleanupTable(table, olderThan) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return Math.floor(Math.random() * 100);
    }
};
exports.CleanupDataService = CleanupDataService;
exports.CleanupDataService = CleanupDataService = CleanupDataService_1 = __decorate([
    (0, common_1.Injectable)()
], CleanupDataService);
//# sourceMappingURL=cleanup-data.service.js.map