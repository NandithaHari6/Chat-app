import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["../../dist/entities/*.ts"],
    migrations: ["../../dist/migrations/*.ts"],
    synchronize: false,
    logging: true,
    extra: { min: 2, max: 5 },
    namingStrategy: new SnakeNamingStrategy(),
});
