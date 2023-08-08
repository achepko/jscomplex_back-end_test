import { adRepository } from "../repositories/ad.repository";
import { IAd } from "../types/ad.type";

class AdService {
  public async findAll(): Promise<IAd[]> {
    return await adRepository.findAll();
  }
  public async findById(id: string): Promise<IAd> {
    return await adRepository.findById(id);
  }
  public async create(data: IAd): Promise<IAd> {
    return await adRepository.create(data);
  }
  public async updateById(id: string, data: Partial<IAd>): Promise<IAd> {
    return await adRepository.updateById(id, data);
  }
  public async deleteById(id: string): Promise<void> {
    return await adRepository.deleteById(id);
  }
}
export const adService = new AdService();
