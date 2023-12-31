import { Types } from "mongoose";

import { EUserAccountType } from "../enums/user-enums/accountType.enum";
import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { ICredentials } from "../types/token.type";
import { IUser } from "../types/user.type";

class UserRepository {
  public async create(data: IUser, hashedPassword: string): Promise<IUser> {
    try {
      return await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async find(credentials: ICredentials): Promise<IUser> {
    try {
      return await User.findOne({ email: credentials.email });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(loggedUserId: Types.ObjectId): Promise<IUser> {
    try {
      return await User.findOne({ _id: loggedUserId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async upgradeAccount(id: Types.ObjectId): Promise<IUser> {
    const upgradedUser = await User.findOneAndUpdate(
      { _id: id },
      { accountType: EUserAccountType.premium },
      { returnDocument: "after" }
    );
    return upgradedUser;
  }
}
export const userRepository = new UserRepository();
