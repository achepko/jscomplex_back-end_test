import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/token-enums/token-type.enum";
import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { ApiError } from "../errors/api.error";
import { Ad } from "../models/Ad.model";
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
          "You are not authorized to delete this advertisement",
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
      const { accountType } = res.locals.user;
      if (accountType === EUserAccountType.basic) {
        throw new ApiError(
          "You don't have rights to get this information",
          403
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
