import { config } from "dotenv";
import bcrypt from "bcryptjs";
import connection, { dbConnection } from "./config/db";
import { User, Movie, WatchList } from "./models/index";

config();

const users = [
  { first_name: "Alice", last_name: "Johnson", email: "alice@example.com", password: "password123" },
  { first_name: "Bob", last_name: "Smith", email: "bob@example.com", password: "password123" },
  { first_name: "Charlie", last_name: "Brown", email: "charlie@example.com", password: "password123" },
];

const movies = [
  {
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    releaseYear: "2010",
    genres: ["Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/posters/inception.jpg",
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker, a criminal mastermind wreaking havoc on Gotham.",
    releaseYear: "2008",
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/posters/dark-knight.jpg",
  },
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space.",
    releaseYear: "2014",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://example.com/posters/interstellar.jpg",
  },
  {
    title: "Parasite",
    overview: "Greed and class discrimination threaten the relationship between two families.",
    releaseYear: "2019",
    genres: ["Drama", "Thriller"],
    runtime: 132,
    posterUrl: "https://example.com/posters/parasite.jpg",
  },
];

async function seed() {
  await dbConnection();

  await WatchList.drop().catch(() => {});
  await Movie.drop().catch(() => {});
  await User.drop().catch(() => {});

  await User.sync();
  await Movie.sync();
  await WatchList.sync();

  const salt = await bcrypt.genSalt(10);
  const createdUsers = await User.bulkCreate(
    await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, salt),
      }))
    )
  );

  const createdMovies = await Movie.bulkCreate(
    movies.map((m, i) => ({
      ...m,
      createdBy: createdUsers[i % createdUsers.length].id,
    }))
  );

  const statuses = ["watching", "completed", "plan_to_watch"];

  const watchlistEntries: import("@sequelize/core").CreationAttributes<WatchList>[] = [];
  createdUsers.forEach((user) => {
    createdMovies.forEach((movie, i) => {
      if ((user.id + movie.id) % 2 === 0) {
        watchlistEntries.push({
          userId: user.id,
          movieId: movie.id,
          status: statuses[i % statuses.length],
          rating: Math.floor(Math.random() * 5) + 1,
          notes: `${user.first_name}'s notes on ${movie.title}`,
        });
      }
    });
  });

  await WatchList.bulkCreate(watchlistEntries);

  console.log(
    `Seeded ${createdUsers.length} users, ${createdMovies.length} movies, ${watchlistEntries.length} watchlist entries`
  );
}

seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await connection.close();
  });
