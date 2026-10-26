import  {Event}  from "../models";
import { IEventRepository } from "../repositories/eventRepository";

export interface EventListInput {
  offset : number,
  limit : number,
  filter? : eventFilters
}


export class EventService {
  constructor(private readonly event: IEventRepository) {}

  async eventList(input: EventListInput): Promise<{ rows: Event[]; count: number }>{
    const {rows,count} = await this.event.findPage({limit : input.limit, offset :input.offset, filter : input.filter})

    return {rows,count};
    
  }

}
