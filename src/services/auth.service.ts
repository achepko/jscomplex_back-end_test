import { Response } from "express";

import { ApiError } from "../errors/api.error";
import { authRepository } from "../repositories/auth.repository";
import { IUser } from "../types/user.type";

class AuthService {
  public async register(data: IUser): Promise<Response<void>> {
    try {
      // passwordhashed
      return await authRepository.register(data);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
