"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("./config");
exports.typeOrmConfig = {
    type: "postgres",
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    username: config_1.config.db.user,
    password: config_1.config.db.pass,
    database: config_1.config.db.name,
    autoLoadEntities: true,
    synchronize: true,
};
//# sourceMappingURL=database.js.map