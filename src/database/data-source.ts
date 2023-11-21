import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config();
// @ts-ignore
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "postgres",
  port: Number(process.env.POSTGRES_PORT) || 5432,  // Updated to PostgreSQL's default port
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "password",
  database: process.env.POSTGRES_DB || "postgres",
  logging: process.env.ORM_LOGGING === "true",
  entities: [
	"src/database/entities/*.ts"
  ],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: true, // Be cautious with synchronize in production
})
