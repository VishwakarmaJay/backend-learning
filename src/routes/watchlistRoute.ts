import express, { Router } from 'express';
import { addToWatchlist } from '../controller/watchlistController';

const watchlistRouter : Router = express.Router();

watchlistRouter.post('/add',addToWatchlist);

export default watchlistRouter;
