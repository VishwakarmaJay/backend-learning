import { Op } from "@sequelize/core";
import { Event, Movie } from "../models";

export interface IEventRepository {
  findPage(opts: {
    limit: number;
    offset: number;
    filter?: eventFilters;
  }): Promise<{ rows: Event[]; count: number }>;
}

export class EventRepository implements IEventRepository {

  findPage(opts: {
    limit: number;
    offset: number;
    filter?: eventFilters;
  }): Promise<{ rows: Event[]; count: number }> {
    const filter = opts.filter;

    const where: any = {};

    if (filter?.title) where.title = { [Op.like]: `%${filter.title}%` };

    if (filter?.venue !== undefined) where.venueId = filter.venue;

    if (filter?.from !== undefined || filter?.to !== undefined) {
  where.startTime = {                       // ← column name as the key
    ...(filter.from !== undefined && { [Op.gte]: filter.from }),
    ...(filter.to   !== undefined && { [Op.lte]: filter.to }),
  };
}

    return Event.findAndCountAll({
      where,
      limit: opts.limit,
      offset: opts.offset,
      order: ["id"],
    });
  }
}
