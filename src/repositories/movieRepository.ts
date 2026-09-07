import { CreationAttributes } from "@sequelize/core";
import { Movie } from "../models";

export interface IMovieRepository {

    findPage(opts: { limit: number; offset: number }): Promise<{ rows: Movie[]; count: number }>
  
}

export class MovieRepository implements IMovieRepository {


    findPage(opts: { limit: number; offset: number; }): Promise<{ rows: Movie[]; count: number; }> {

            return Movie.findAndCountAll({limit : opts.limit, offset : opts.offset,order : ['id'],});

    }

    
 
  
}
