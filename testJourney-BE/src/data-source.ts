import "reflect-metadata"
import { DataSource } from "typeorm"
import "dotenv/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "monorail.proxy.rlwy.net",
    port: 55340,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "railway",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
