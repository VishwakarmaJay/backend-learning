import { Movie, User } from "../models";
import { IMovieRepository } from "../repositories/movieRepository";

export interface MovieListInput {
  offset : number,
  limit : number
}

export class MovieService {
  constructor(private readonly movie: IMovieRepository) {}

  async movieList(input: MovieListInput): Promise<{ rows: Movie[]; count: number }>{
    const {rows,count} = await this.movie.findPage({limit : input.limit, offset :input.offset})

    return {rows,count};
    
  }

}
