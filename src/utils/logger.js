import pino from "pino";
import {env} from "../config/env.js";

const logger = pino({
  level: env.LOG_LEVEL || "info",
  redact: {
  paths: [
    'req.headers.authorization',
    'req.headers.cookie',
    'res.headers["set-cookie"]',
    'password',
    '*.password',
  ],
  censor: '[REDACTED]',
},
  transport:
    env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

export default logger;