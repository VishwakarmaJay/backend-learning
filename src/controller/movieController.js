import logger from "../utils/logger.js";
import { Movie } from "../models/index.js";
import AppError from "../utils/appError.js";

export const addPoster = async (req, res) => {

  const { id } = req.params;

  if (!req.file) {
    throw new AppError( "Poster file is required",400);
  }

  const movie = await Movie.findByPk(id);

  if (!movie) {
    throw new AppError( "Movie not found",404);
  }

  movie.posterUrl = req.file.filename;
  await movie.save();


  res.status(200).json({ data: movie, message: "Poster added successfully" });
};
