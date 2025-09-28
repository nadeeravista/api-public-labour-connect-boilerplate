import { Module } from "@nestjs/common";
import { KnexModule } from "nestjs-knex";
import { Knex } from "knex";
import { Logger } from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV || "development";
const logger = new Logger("DatabaseModule");

const knexConfig: { [key: string]: Knex.Config } = {
  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    debug: false,
  },
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 5430,
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "rs",
      database: process.env.DATABASE_NAME || "rs",
    } as Knex.PgConnectionConfig,
    searchPath: [process.env.DATABASE_SCHEMA || "labour-connect", "public"],
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    debug: environment === "development",
    log: {
      warn(message: string) {
        logger.warn(message);
      },
      error(message: string) {
        logger.error(message);
      },
      debug(message: string) {
        logger.debug(message);
      },
      deprecate(message: string) {
        logger.warn(`DEPRECATED: ${message}`);
      },
    },
  },
  production: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
    } as Knex.PgConnectionConfig,
    searchPath: [process.env.DATABASE_SCHEMA || "labour-connect", "public"],
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

@Module({
  imports: [
    KnexModule.forRoot({
      config: knexConfig[environment],
    }),
  ],
  exports: [KnexModule],
})
export class DatabaseModule {
  constructor() {}
}
