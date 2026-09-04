import { Request, Response } from "express";
import { User, Movie, WatchList } from "../models/index";
import AppError from "../utils/appError";

export const addToWatchlist = async (req : Request, res : Response) => {
  const { movieId, status, rating, notes } = req.body;

  const user  = await User.findByPk(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const movie = await Movie.findByPk(movieId);
  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  const existingEntry = await WatchList.findOne({
    where: {
      userId: req.user.id,
      movieId: movieId,
    },
  });
  if (existingEntry) {
    throw new AppError("Movie already in watchlist", 409);
  }

  const newEntry = await WatchList.create({
    userId: req.user.id,
    movieId: movieId,
    status: status,
    rating: rating,
    notes: notes,
  });
  res.status(201).json(newEntry);
};


export const getWatchlist = async (req : Request, res : Response ) =>{

    const userId = req.user.id;

    const watchList = await WatchList.findAll({
      where : {
        userId : userId
      },
      include : [
        {
          association : WatchList.associations.movie
        }
      ]
    });


    res.status(200).json({"list" : watchList})

}
