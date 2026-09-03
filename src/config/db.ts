import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import { env } from "./env";
import logger from '../utils/logger';
import AppError from "../utils/appError";
import { User, Movie, WatchList } from '../models/index';

const connection = new Sequelize({
  dialect: MySqlDialect,
  url: env.DB_URL,
  models: [User, Movie, WatchList],
});

export async function dbConnection() {
  try {
    await connection.authenticate();
    logger.info("Connection has Established");
  } catch (e) {
    logger.error({ err: e }, "Unable to connect to the database");
    throw new AppError("Database Connection Failed", 500);
  }
}

export default connection;
