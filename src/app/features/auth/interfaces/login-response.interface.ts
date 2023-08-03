import { IToken } from '@auth/interfaces/token.interface';

export interface ILoginResponse {
  token: IToken;
  username: string;
  user_id: string;
}
