import { Op } from "@sequelize/core";
import { Movie } from "../models";

export interface IMovieRepository {
  findPage(opts: {
    limit: number;
    offset: number;
  }): Promise<{ rows: Movie[]; count: number }>;
  findPageByCursor(opts: { limit: number; cursor?: number }): Promise<{rows : Movie[],hasMore : boolean}>;
}

export class MovieRepository implements IMovieRepository {
  async findPageByCursor(opts: { limit: number; cursor?: number }): Promise<{rows : Movie[],hasMore : boolean}> {
    const rows = await Movie.findAll({
      where:
        opts.cursor !== undefined
          ? {
              id: {
                [Op.gt]: opts.cursor,
              },
            }
          : undefined,
      limit: opts.limit + 1,
      order: [["id", "ASC"]],
    });

    const hasMore = rows.length > opts.limit

    return {rows : hasMore ? rows.slice(0,opts.limit) : rows,hasMore : hasMore}

  }

  findPage(opts: {
    limit: number;
    offset: number;
  }): Promise<{ rows: Movie[]; count: number }> {
    return Movie.findAndCountAll({
      limit: opts.limit,
      offset: opts.offset,
      order: ["id"],
    });
  }
}
