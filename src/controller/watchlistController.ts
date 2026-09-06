import { Request, Response } from "express";
import { User, Movie, WatchList } from "../models/index";
import AppError from "../utils/appError";
import connection from "../config/db";
import { UniqueConstraintError } from "@sequelize/core";

export const addToWatchlist = async (req: Request, res: Response) => {
  const { movieId, status, rating, notes } = req.body;

  const user = await User.findByPk(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const movie = await Movie.findByPk(movieId);
  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  try {
    const entry = await WatchList.create({
      userId: req.user.id,
      movieId,
      status,
      rating,
      notes,
    });
    res.status(201).json(entry);
  } catch (e) {
    if (e instanceof UniqueConstraintError)
      throw new AppError("Movie already in watchlist", 409);
    throw e;
  }
};

export const getWatchlist = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const watchList = await WatchList.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        association: WatchList.associations.movie,
      },
    ],
  });

  res.status(200).json({ list: watchList });
};

export const bulkAddToWatchlist = async (req: Request, res: Response) => {
  const { movieIds } = req.body as { movieIds: number[] };
  const userId: number = req.user.id;

  const created = await connection.transaction(async (t) => {
    const entries = [];

    for (const movieId of movieIds) {
      const movie = await Movie.findByPk(movieId);
      if (!movie) throw new AppError("Movie Not Found", 404);
      entries.push(
        await WatchList.create({ userId, movieId }, { transaction: t }),
      );
    }

    return entries;
  });

  res.status(201).json({ added: created.length, list: created });
};
