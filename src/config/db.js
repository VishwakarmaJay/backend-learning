import {Sequelize} from 'sequelize'
import {env} from "../config/env.js";
import logger from '../utils/logger.js';
import AppError from "../utils/appError.js";


const connection = new Sequelize(env.DB_URL,{
    // host : '127.0.0.1',
    // database : 'practice',
    // username : 'root',
    // password : "123",
    // port : 3306,
    dialect: 'mysql'
});

export async function dbConnection () {
    try {
        await connection.authenticate();
        logger.info("Connection has Established");
    }
    catch(e){
        logger.error(e, "Unable to connect to the database");
        throw new AppError("Database Connection Failed",500);
    }
}

export default connection;

