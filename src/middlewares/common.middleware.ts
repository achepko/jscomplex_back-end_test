import Filter from "bad-words";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

const filter = new Filter();

class CommonMiddleware {
  public isIdValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[field];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Id is not valid", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyСensorshipChecked(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const swear = filter.isProfane(req.body.description);
      if (swear) {
        throw new ApiError("Swear words are forbidden", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
