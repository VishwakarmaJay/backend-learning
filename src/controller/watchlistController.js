import { User, Movie, WatchList } from "../models/index.js";
import AppError from "../utils/appError.js";

export const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  const user = await User.findByPk(req.user.id);
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
