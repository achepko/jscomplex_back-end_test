import Joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { EUserRoles } from "../enums/user-enums/roles.enum";

export class UserValidator {
  static userName = Joi.string().min(3).max(30).trim();
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "This field is required",
      "string.email": "Email doesn't have correct format",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).messages({
    "string.pattern.base":
      "Password must contain at least 8 characters, one letter, one number, and one special character",
    "string.empty": "This field is required",
  });
  static accountType = Joi.string()
    .valid(EUserAccountType)
    .default(EUserAccountType.basic);
  static role = Joi.string().valid(EUserRoles);

  static register = Joi.object({
    name: this.userName,
    email: this.email.required(),
    password: this.password.required(),
    accountType: this.accountType,
    role: this.role.required(),
  });
  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
