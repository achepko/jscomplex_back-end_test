import { Ad } from "../models/Ad.model";
// import { adRepository } from "../repositories/ad.repository";
import { IAd } from "../types/ad.type";

class AdService {
  public async findAll(): Promise<IAd[]> {
    return await Ad.find();
  }
  // public async create(data: IAd): Promise<IAd> {
  //   return await adRepository.create(data);
  // }
}
export const adService = new AdService();
