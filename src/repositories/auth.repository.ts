import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class AuthRepository {
  public async createUser(data: IUser, hashedPassword: string): Promise<IUser> {
    try {
      // return await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authRepository = new AuthRepository();
