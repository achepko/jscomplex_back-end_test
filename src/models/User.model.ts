import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
