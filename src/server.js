import express from 'express';
import { config } from 'dotenv';
import movieRouter from './routes/movies.js';   
import { dbConnection } from './config/db.js';
import "./models/index.js";
import { Movie, User, WatchList } from './models/index.js';
import authRouter from './routes/authRoute.js';
import watchlistRouter from './routes/watchlistRoute.js';
import { authMiddelWare } from './middelware/authMiddelWare.js';
config();

dbConnection();

await User.sync();
await Movie.sync();
await WatchList.sync();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/auth',authRouter)
app.use(authMiddelWare)
app.use("/movies", movieRouter )
app.use("/watchlist", watchlistRouter)


app.listen(3000,()=>{
    console.log("Server Started")
} )