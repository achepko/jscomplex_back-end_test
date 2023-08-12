import { Types } from "mongoose";

import { adRepository } from "../repositories/ad.repository";
import { IAd } from "../types/ad.type";

class AdService {
  public async findAll(): Promise<IAd[]> {
    return await adRepository.findAll();
  }
  public async findById(id: string): Promise<IAd> {
    return await adRepository.findById(id);
  }
  public async create(data: IAd, loggedUserId: Types.ObjectId): Promise<IAd> {
    return await adRepository.create(data, loggedUserId);
  }
  public async updateById(id: string, data: Partial<IAd>): Promise<IAd> {
    return await adRepository.updateById(id, data);
  }
  public async deleteById(id: string): Promise<void> {
    return await adRepository.deleteById(id);
  }
  public async findInRegion(adInfo: IAd): Promise<number> {
    const priceForCarInRegion = await adRepository.findByParameters(adInfo);
    const totalPrices = priceForCarInRegion.reduce(
      (sum, ad) => sum + ad.price.value,
      0
    );
    const averagePrice = totalPrices / priceForCarInRegion.length;
    return averagePrice;
  }
  public async findInRegion(adInfo: IAd): Promise<number> {
    const priceForCarInRegion = await adRepository.findByParameters(adInfo);
    const totalPrices = priceForCarInRegion.reduce(
        (sum, ad) => sum + ad.price.value,
        0
    );
    const averagePrice = totalPrices / priceForCarInRegion.length;
    return averagePrice;
  }
}
export const adService = new AdService();
