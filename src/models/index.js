import User from "./user.js";
import Movie from "./movie.js";
import WatchList from "./watchlist.js";
const models = {
    User,
    Movie,
    WatchList
};

User.associate(models);
Movie.associate(models);
WatchList.associate(models);

export {
    User,
    Movie,
    WatchList
};

export default models;