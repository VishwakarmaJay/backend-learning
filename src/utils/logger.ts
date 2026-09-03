import pino from "pino";
import {env} from "../config/env";

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
  ...(env.NODE_ENV !== "production"
    ? { transport: { target: "pino-pretty", options: { colorize: true } } }
    : {}),
});

export default logger;