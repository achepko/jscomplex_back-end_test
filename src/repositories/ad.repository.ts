import { ApiError } from "../errors/api.error";
import { Ad } from "../models/Ad.model";
import { IAd } from "../types/ad.type";

class AdRepository {
  public async findAll(): Promise<IAd[]> {
    return await Ad.find();
  }
  public async findById(id: string): Promise<IAd> {
    return await this.getOneByIdOrThrow(id);
  }
  public async create(data: IAd): Promise<IAd> {
    return await Ad.create(data);
  }
  private async getOneByIdOrThrow(adId: string): Promise<IAd> {
    const ad = await Ad.findById(adId);
    if (!ad) {
      throw new ApiError("Advertisement not found,", 422);
    }
    return ad;
  }
}

export const adRepository = new AdRepository();
