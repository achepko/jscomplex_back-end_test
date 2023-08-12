import { model, Schema } from "mongoose";

import { EAdPriceCurrency } from "../enums/ad-enums/currency.enum";
import { EAdStatus } from "../enums/ad-enums/status.enum";

const adSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: {
      value: { type: Number, required: true },
      currency: { type: String, enum: EAdPriceCurrency, required: true },
      exchangeRate: { type: Number, required: true },
    },
    description: { type: String, required: true },
    status: { type: String, enum: EAdStatus, default: EAdStatus.pending },
    views: { type: Number, default: 0 },
    region: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User"},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

adSchema.pre("save", async function (next) {
  if (!this.authorId) {
    throw new Error("Author ID is required");
  }

  this.createdAt = new Date();
  next();
});

export const Ad = model("ad", adSchema);
