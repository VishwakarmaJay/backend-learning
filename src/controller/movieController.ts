import logger from "../utils/logger";
import { Movie } from "../models/index";
import AppError from "../utils/appError";
import { Request, Response } from "express";

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
  await movie.save();


  res.status(200).json({ data: movie, message: "Poster added successfully" });
};

export const getMovie = async (req : Request, res : Response) => {
  const { id } = req.params;

  const movie = await Movie.findByPk(id);

  if (!movie) {
    throw new AppError( "Movie not found",404);
  }

  res.status(200).json({ data: movie, message: "Movie fetched successfully" });
};
