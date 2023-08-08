import { Ad } from "../models/Ad.model";
import { IAd } from "../types/ad.type";

class AdRepository {
  public async create(data: IAd): Promise<IAd> {
    return await Ad.create(data);
  }
}

export const adRepository = new AdRepository();
