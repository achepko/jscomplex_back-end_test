import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/token-enums/token-type.enum";
import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { EUserRoles } from "../enums/user-enums/roles.enum";
import { ApiError } from "../errors/api.error";
import { Ad } from "../models/Ad.model";
import { User } from "../models/User.model";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("No access token in storage", 401);
      }
      const payload = tokenService.checkToken(accessToken, ETokenType.Access);
      await tokenRepository.find(accessToken);
      req.res.locals.Payload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkAuthorId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id: loggedUserId } = req.res.locals.Payload;
      const adId = req.params.adId;
      const ad = await Ad.findById(adId);
      if (!ad) {
        throw new ApiError("Advertisement was not found", 404);
      }

      if (ad.authorId.toString() !== loggedUserId) {
        throw new ApiError(
          "You are not authorized of this advertisement",
          403
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkAccountType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id: loggedUserId } = req.res.locals.Payload;
      const user = await User.findOne({ _id: loggedUserId });
      if (!user) {
        throw new ApiError("User not found", 422);
      }
      if (user.accountType === EUserAccountType.basic) {
        throw new ApiError(
          "You don't have rights to get this information. Please buy premium account",
          403
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkAccountRole(allowedRoles: EUserRoles[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { _id: loggedUserId } = req.res.locals.Payload;
        const { role: userRole } = await User.findOne({ _id: loggedUserId });
        if (!userRole) {
          throw new ApiError("User not found", 422);
        }
        if (!userRole || !allowedRoles.includes(userRole as EUserRoles)) {
          throw new ApiError("Access denied", 403);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
