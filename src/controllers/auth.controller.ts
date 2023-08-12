import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { ITokenPair } from "../types/token.type";
import { IUser } from "../types/user.type";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      await authService.register(req.body);
      return res
        .status(200)
        .send(`New user with email "${req.body.email}" was registered`);
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const tokensPair = await authService.login(req.body, req.res.locals.user);
      return res.status(200).json({ ...tokensPair });
    } catch (e) {
      next(e);
    }
  }
  public async getUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { _id: loggedUserId } = req.res.locals.Payload;
      const userProfile = await authService.getUserProfile(loggedUserId);
      return res.json(userProfile);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
