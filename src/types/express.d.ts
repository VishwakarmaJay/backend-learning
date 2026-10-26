import type { User } from "../models/index";

// Augment Express's Request so `req.user` (set by authMiddelWare) is typed.
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }

  type filters  = {
    q : string | undefined,
    year: string | undefined,
    minRuntime:  number | undefined,
    maxRuntime: number | undefined,
  }

  type eventFilters = {
    venue: number | undefined,
    title : string | undefined,
    from : Date  | undefined, // start time
    to : Date  | undefined, // end times
  }

}



export {};
