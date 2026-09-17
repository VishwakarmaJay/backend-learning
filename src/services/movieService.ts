import { Movie } from "../models";
import { IMovieRepository } from "../repositories/movieRepository";

export interface MovieListInput {
  offset : number,
  limit : number,
  filter? : filters
}

export interface MovieCusorListInput {
  limit : number
  cursor? : number
}

export class MovieService {
  constructor(private readonly movie: IMovieRepository) {}

  async movieList(input: MovieListInput): Promise<{ rows: Movie[]; count: number }>{
    const {rows,count} = await this.movie.findPage({limit : input.limit, offset :input.offset, filter : input.filter})

    return {rows,count};
    
  }

  async movieCusorList (input : MovieCusorListInput) : Promise<{rows : Movie[], hasMore : boolean}>
  {
    const {rows , hasMore} = await this.movie.findPageByCursor({limit : input.limit , cursor : input.cursor})

    return {rows : rows , hasMore : hasMore};
  }

}
