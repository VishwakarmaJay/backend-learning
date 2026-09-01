import express from 'express';
import { addToWatchlist } from '../controller/watchlistController.js';

const watchlistRouter = express.Router();

watchlistRouter.post('/add',addToWatchlist);

export default watchlistRouter;
