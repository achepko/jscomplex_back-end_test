import { Types } from "mongoose";

import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { IPaymentForPremium } from "../types/payment-for-premium.type";
import { ICredentials, ITokenPair } from "../types/token.type";
import { IUser } from "../types/user.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<IUser> {
    try {
      const hashedPassword = await passwordService.hash(data.password);
      return userRepository.create(data, hashedPassword);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }
      const tokenPair = await tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });
      await tokenRepository.create(tokenPair, user._id);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getUserProfile(loggedUserId: Types.ObjectId): Promise<IUser> {
    try {
      return userRepository.findById(loggedUserId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async buyPremiumAccount(
    loggedUserId: Types.ObjectId,
    payment: IPaymentForPremium
  ): Promise<IUser> {
    try {
      const user = await userRepository.findById(loggedUserId);
      if (user.accountType === EUserAccountType.premium) {
        throw new ApiError("User already has a premium account", 400);
      }
      if (payment.amount < 200) {
        throw new ApiError(
          "Price of premium account - 200 UAH. Please replenish your card",
          400
        );
      }
      return userRepository.upgradeAccount(user._id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
