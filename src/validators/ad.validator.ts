import Joi from "joi";

import { EAdPriceCurrency } from "../enums/ad-enums/currency.enum";
import { EAdRegion } from "../enums/ad-enums/region.enum";
import { EAdStatus } from "../enums/ad-enums/status.enum";
import { ECarBrand } from "../enums/cars-enums/car-brand.enum";
import { ECarModel } from "../enums/cars-enums/car-model.enum";

export class AdValidator {
  static brand = Joi.string()
    .valid(...Object.values(ECarBrand))
    .messages({
      "any.only": "Invalid car brand selected",
    });
  static model = Joi.string().valid(...Object.values(ECarModel));
  static price = Joi.object({
    value: Joi.number(),
    currency: Joi.string().valid(...Object.values(EAdPriceCurrency)),
    exchangeRate: Joi.number(),
  });
  static description = Joi.string();
  static status = Joi.string()
    .valid(...Object.values(EAdStatus))
    .default(EAdStatus.pending);
  static views = Joi.number().default(0);
  static region = Joi.string().valid(...Object.values(EAdRegion));

  static authorId = Joi.string().hex();

  static create = Joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    price: this.price,
    description: this.description.required(),
    status: this.status,
    views: this.views,
    region: this.region.required(),
    authorId: this.authorId,
  });
  static update = Joi.object({
    brand: this.brand,
    model: this.model,
    price: this.price,
    description: this.description,
    status: this.status,
    views: this.views,
    region: this.region,
  });
}
