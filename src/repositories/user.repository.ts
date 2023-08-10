import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { ICredentials } from "../types/token.type";
import { IUser } from "../types/user.type";

class UserRepository {
  public async create(data: IUser, hashedPassword: string): Promise<IUser> {
    try {
      // return await User.create({ ...data, password: hashedPassword });
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
}

export const userRepository = new UserRepository();
