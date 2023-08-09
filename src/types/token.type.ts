import { IUser } from "./user.type";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

// export type ITokenPayload = Pick<IUser, "name" | "_id">;
export type ITokenPayload = Pick<IUser, "name">;
