import express, { Router } from 'express';
import { addToWatchlist, bulkAddToWatchlist, getWatchlist} from '../controller/watchlistController';

const watchlistRouter : Router = express.Router();

watchlistRouter.post('/add',addToWatchlist);
watchlistRouter.get("/", getWatchlist)
watchlistRouter.post('/bulk', bulkAddToWatchlist)

export default watchlistRouter;
