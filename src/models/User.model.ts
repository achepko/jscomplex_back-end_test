import { model, Schema } from "mongoose";

import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { EUserRoles } from "../enums/user-enums/roles.enum";

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
    accountType: {
      type: String,
      enum: EUserAccountType,
      default: EUserAccountType.basic,
    },
    role: {
      type: String,
      enum: EUserRoles,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
