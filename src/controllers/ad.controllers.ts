import { NextFunction, Request, Response } from "express";

import { adService } from "../services/ad.service";
import { IAd } from "../types/ad.type";

class AdController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IAd[]>> {
    try {
      const ads = await adService.findAll();
      return res.json(ads);
    } catch (e) {
      next(e);
    }
  }
}

export const adController = new AdController();
