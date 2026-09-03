import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import logger from "../utils/logger";

export const errorHandler = (err : AppError, req : Request, res : Response, next : NextFunction) => {
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
