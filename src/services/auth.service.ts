
import { ApiError } from "../errors/api.error";
import { authRepository } from "../repositories/auth.repository";
import { IUser } from "../types/user.type";
import { passwordService } from "./password.service";

class AuthService {
  public async register(data: IUser): Promise<IUser> {
    try {
      const hashedPassword = await passwordService.hash(data.password);
      return await authRepository.createUser(data, hashedPassword);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
