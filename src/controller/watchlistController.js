import { User, Movie, WatchList } from "../models/index.js";

export const addToWatchlist = async (req, res) => {
  try {
    const {  movieId, status, rating, notes } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const existingEntry = await WatchList.findOne({
      where: { 
        userId :req.user.id, 
        movieId :movieId 
    },
    });
    if (existingEntry) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const newEntry = await WatchList.create({
      userId : req.user.id,
      movieId : movieId,
      status : status,
      rating : rating,
      notes : notes,
    });
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
