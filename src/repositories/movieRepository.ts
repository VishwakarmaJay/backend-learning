import { Op } from "@sequelize/core";
import { Movie } from "../models";

export interface IMovieRepository {
  findPage(opts: {
    limit: number;
    offset: number;
    filter?: filters;
  }): Promise<{ rows: Movie[]; count: number }>;
  findPageByCursor(opts: {
    limit: number;
    cursor?: number;
  }): Promise<{ rows: Movie[]; hasMore: boolean }>;
}

export class MovieRepository implements IMovieRepository {
  async findPageByCursor(opts: {
    limit: number;
    cursor?: number;
  }): Promise<{ rows: Movie[]; hasMore: boolean }> {
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

    const hasMore = rows.length > opts.limit;

    return {
      rows: hasMore ? rows.slice(0, opts.limit) : rows,
      hasMore: hasMore,
    };
  }

  findPage(opts: {
    limit: number;
    offset: number;
    filter?: filters;
  }): Promise<{ rows: Movie[]; count: number }> {
    const filter = opts.filter;

    const where: any = {};

    if (filter?.q) where.title = { [Op.like]: `%${filter.q}%` };

    if (filter?.year) where.releaseYear = filter.year;
    
    if (filter?.minRuntime !== undefined || filter?.maxRuntime !== undefined) {
      where.runtime = {
        ...(filter.minRuntime !== undefined && { [Op.gte]: filter.minRuntime }),
        ...(filter.maxRuntime !== undefined && { [Op.lte]: filter.maxRuntime }),
      };
    }

    return Movie.findAndCountAll({
      where,
      limit: opts.limit,
      offset: opts.offset,
      order: ["id"],
    });
  }
}
