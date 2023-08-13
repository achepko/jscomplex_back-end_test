import Joi from "joi";

import { EAdPriceCurrency } from "../enums/ad-enums/currency.enum";
import { EAdEditCount } from "../enums/ad-enums/edit-count.enum";
import { EAdRegion } from "../enums/ad-enums/region.enum";
import { EAdStatus } from "../enums/ad-enums/status.enum";
import { ECarBrand } from "../enums/cars-enums/car-brand.enum";
import { ECarModel } from "../enums/cars-enums/car-model.enum";

export class AdValidator {
  static brand = Joi.string()
    .valid(...Object.values(ECarBrand))
    .messages({
      "any.only": "Invalid car brand selected, please ask admin for help",
    });
  static model = Joi.string()
    .valid(...Object.values(ECarModel))
    .messages({
      "any.only": "Invalid car model selected, please ask admin for help",
    });
  static price = Joi.object({
    value: Joi.number(),
    currency: Joi.string().valid(...Object.values(EAdPriceCurrency)),
    exchangeRate: Joi.number(),
  }).messages({
    "any.only": "Invalid car price",
  });
  static description = Joi.string();
  static status = Joi.string()
    .valid(...Object.values(EAdStatus))
    .default(EAdStatus.pending);
  static views = Joi.number().default(0);
  static region = Joi.string().valid(...Object.values(EAdRegion));

  static authorId = Joi.string().hex();
  static editCount = Joi.number()
    .valid(...Object.values(EAdEditCount))
    .default(EAdEditCount.zero);

  static create = Joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    price: this.price,
    description: this.description.required(),
    status: this.status,
    region: this.region.required(),
    authorId: this.authorId,
    editCount: this.editCount,
  });
  static update = Joi.object({
    brand: this.brand,
    model: this.model,
    price: this.price,
    description: this.description,
    region: this.region,
    status: this.status,
    editCount: this.editCount,
  });
}
