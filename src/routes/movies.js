import express  from "express";

const movieRouter = express.Router()

movieRouter.get("/",(req, res)=>{
    res.json({message : "Hello"})
});

export default movieRouter;