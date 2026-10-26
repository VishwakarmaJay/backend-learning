import {User} from "./user";
import {Movie} from "./movie";
import {WatchList} from "./watchlist";
import { Venue } from "./venue";
import { Booking } from "./booking";
import { Event } from "./event";
import { RefreshToken } from "./refreshToken";

const models = {
    User,
    Movie,
    WatchList,
    Event,
    Venue,
    Booking,
    RefreshToken
};

export {
    User,
    Movie,
    WatchList,
    Event,
    Venue,
    Booking,
    RefreshToken
};

export default models;