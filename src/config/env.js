import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    DB_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    LOG_LEVEL: z.enum(["trace","debug","info","warn","error","fatal"]).default("info"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment variables:", parsedEnv.error.message);
    process.exit(1);
}

export const env = parsedEnv.data;