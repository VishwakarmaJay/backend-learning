import type { User } from "../models/index";

// Augment Express's Request so `req.user` (set by authMiddelWare) is typed.
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export {};
