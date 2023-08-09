import { NextFunction, Request, Response } from "express";

import { adService } from "../services/ad.service";
import { authService } from "../services/auth.service";

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
}

export const authController = new AuthController();
