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
  public async updateById(id: string, data: Partial<IAd>): Promise<IAd> {
    await this.getOneByIdOrThrow(id);
    return await Ad.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" }
    );
  }
  public async deleteById(id: string): Promise<void> {
    await this.getOneByIdOrThrow(id);
    await Ad.findByIdAndRemove({ _id: id });
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
