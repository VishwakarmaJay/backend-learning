import express from "express";
import movieRouter from "./routes/movies";
import { dbConnection } from "./config/db";
import "./models/index";
import "dotenv/config"; 
import authRouter from "./routes/authRoute";
import watchlistRouter from "./routes/watchlistRoute";
import { authMiddelWare } from "./middelware/authMiddelWare";
import { errorHandler } from "./middelware/errorHandler";
import logger from "./utils/logger";
import pinoHttp from "pino-http";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import authLimiter from "./utils/authLimiter";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "node:fs";



dbConnection();

const openapiDoc = YAML.parse(
  fs.readFileSync(new URL("./swagger.yaml", import.meta.url), "utf8")
);

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDoc));
app.use(authMiddelWare);
app.use("/movies", movieRouter);
app.use("/watchlist", watchlistRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server Started");
});
