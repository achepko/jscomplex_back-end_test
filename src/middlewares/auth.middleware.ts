import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/token-enums/token-type.enum";
import { ApiError } from "../errors/api.error";
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
}

export const authMiddleware = new AuthMiddleware();
