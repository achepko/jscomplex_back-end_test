import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";

class UserMiddleware {
  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "password"
        );
        if (!user) {
          throw new ApiError("User not found", 422);
        }
        res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
