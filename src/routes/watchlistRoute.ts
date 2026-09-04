import express, { Router } from 'express';
import { addToWatchlist, getWatchlist} from '../controller/watchlistController';

const watchlistRouter : Router = express.Router();

watchlistRouter.post('/add',addToWatchlist);
watchlistRouter.get("/", getWatchlist)

export default watchlistRouter;
