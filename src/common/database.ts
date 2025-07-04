import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "./config";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  autoLoadEntities: true,
  synchronize: true, 
};
