"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanupModule = void 0;
const common_1 = require("@nestjs/common");
const cleanup_data_service_1 = require("./cleanup-data.service");
let CleanupModule = class CleanupModule {
};
exports.CleanupModule = CleanupModule;
exports.CleanupModule = CleanupModule = __decorate([
    (0, common_1.Module)({
        providers: [cleanup_data_service_1.CleanupDataService],
        exports: [cleanup_data_service_1.CleanupDataService],
    })
], CleanupModule);
//# sourceMappingURL=cleanup.module.js.map