import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  if (!err.isOperational) {
    logger.error({ err, method: req.method, url: req.url }, "unexpected error");
  }
  err.statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Something went wrong";

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: message,
  });
};
