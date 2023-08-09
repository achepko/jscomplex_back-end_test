export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  accountType?: string;
  role: string;
}
