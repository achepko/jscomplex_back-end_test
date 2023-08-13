import { model, Schema } from "mongoose";

import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { EUserRoles } from "../enums/user-enums/roles.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

userSchema.pre("save", function (next) {
  if (this.role === EUserRoles.admin) {
    this.accountType = EUserAccountType.premium;
  } else {
    this.accountType = EUserAccountType.basic;
  }
  next();
});

export const User = model("user", userSchema);
