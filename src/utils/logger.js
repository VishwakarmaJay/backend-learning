import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
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
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

export default logger;