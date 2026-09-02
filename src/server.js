import express from "express";
import { config } from "dotenv";
import movieRouter from "./routes/movies.js";
import { dbConnection } from "./config/db.js";
import "./models/index.js";
import { Movie, User, WatchList } from "./models/index.js";
import authRouter from "./routes/authRoute.js";
import watchlistRouter from "./routes/watchlistRoute.js";
import { authMiddelWare } from "./middelware/authMiddelWare.js";
import { errorHandler } from "./middelware/errorHandler.js";
import logger from "./utils/logger.js";
import pinoHttp from "pino-http";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import authLimiter from "./utils/authLimiter.js";


config();

dbConnection();

// await User.sync();
// await Movie.sync();
// await WatchList.sync();

const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth",authLimiter, authRouter);
app.use(authMiddelWare);
app.use("/movies", movieRouter);
app.use("/watchlist", watchlistRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server Started");
});
