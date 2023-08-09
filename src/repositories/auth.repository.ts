import { Response } from "express";

import { ApiError } from "../errors/api.error";
import { IUser } from "../types/user.type";

class AuthRepository {
  public async register(data: IUser): Promise<Response<void>> {
    try {
      console.log(data);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authRepository = new AuthRepository();
