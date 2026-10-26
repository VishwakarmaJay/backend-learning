import express, { Router } from 'express';
import { bookEvent, getEvent, getEventList } from '../controller/eventController';

const eventRouter : Router = express.Router();

eventRouter.get("/", getEventList)
eventRouter.get("/:id", getEvent)
eventRouter.post("/:id/book", bookEvent)

export default eventRouter;
