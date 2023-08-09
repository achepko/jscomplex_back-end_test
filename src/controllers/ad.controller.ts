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
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IAd>> {
    try {
      const user = await adService.findById(req.params.adId);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const ad = await adService.create(req.body);
      return res.status(201).json(ad);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IAd>> {
    try {
      const updatedAd = await adService.updateById(
        req.params.adId,
        req.body as IAd
      );

      return res.status(200).json(updatedAd);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      await adService.deleteById(req.params.adId);

      return res
        .status(200)
        .send(`Advertisement "${req.params.adId}" was deleted successfully`);
    } catch (e) {
      next(e);
    }
  }
}

export const adController = new AdController();
