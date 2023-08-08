import { NextFunction, Response } from "express";

import { IAd } from "../types/ad.type";
import {adService} from "../services/ad.service";

class AdControllers {
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
