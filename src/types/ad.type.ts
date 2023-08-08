export interface IAd {
  brand: string;
  model: string;
  price: {
    value: number;
    currency: string;
    exchangeRate: number;
  };
  description: string;
  status: string;
  views: number;
  region: string;
}
