import { model, Schema } from "mongoose";

const carSchema = new Schema({
  brand: {},
  model: {},
  type: {},
});

export const Car = model("car", carSchema);
