import { Document } from "mongoose";

export interface IAd extends Document {
  brand: string;
  model: string;
  price?: {
    value: number;
    currency: string;
    exchangeRate: number;
  };
  description: string;
  status?: string;
  views?: number;
  region: string;
  // owner: Types.ObjectId;
}
