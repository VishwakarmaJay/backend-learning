import logger from "../utils/logger";
import { Movie } from "../models/index";
import AppError from "../utils/appError";
import { Request, Response } from "express";
import { OptimisticLockError } from "@sequelize/core";

export const addPoster = async (req : Request, res : Response) => {

  const { id } = req.params;

  if (!req.file) {
    throw new AppError( "Poster file is required",400);
  }

  const movie = await Movie.findByPk(id);

  if (!movie) {
    throw new AppError( "Movie not found",404);
  }

  movie.posterUrl = req.file.filename;
  try{
    await movie.save();


  res.status(200).json({ data: movie, message: "Poster added successfully" });
  }
  catch (e) {
  if (e instanceof OptimisticLockError)
    throw new AppError("Movie was modified by someone else — reload and retry", 409);
  throw e;
}
};

export const getMovie = async (req : Request, res : Response) => {
  const { id } = req.params;

  const movie = await Movie.findByPk(id);

  if (!movie) {
    throw new AppError( "Movie not found",404);
  }

  res.status(200).json({ data: movie, message: "Movie fetched successfully" });
};
