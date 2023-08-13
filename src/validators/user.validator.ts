import Joi from "joi";

import {regexConstants} from "../constants/regex.constants";
import {EUserAccountType} from "../enums/user-enums/accountType.enum";
import {EUserRoles} from "../enums/user-enums/roles.enum";

export class UserValidator {
  static userName = Joi.string().min(3).max(30).messages({
    "string.empty": "This field is required",
    "string.min": "Name should have at least {#limit} characters",
    "string.max": "Name should have at most {#limit} characters",
  });
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "This field is required",
      "string.string.pattern.base": "Email doesn't have correct format",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).messages({
    "string.empty": "This field is required",
    "string.pattern.base":
      "Password must contain at least 8 characters, one letter, one number, and one special character",
  });
  static role = Joi.string()
    .valid(...Object.values(EUserRoles))
    .messages({
      "string.empty": "Role is required",
      "any.only": "Invalid role selected",
    });
  static accountType = Joi.string()
    .valid(EUserAccountType)
    .when("role", {
      is: Joi.any().valid(EUserRoles.admin, EUserRoles.manager),
      then: Joi.valid(EUserAccountType).default(EUserAccountType.premium),
      otherwise: Joi.valid(EUserAccountType).default(EUserAccountType.basic),
    });

  static register = Joi.object({
    name: this.userName.required(),
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
