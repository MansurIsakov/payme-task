// ? I put this here because I want to use it in multiple modules, ex. Auth and User
export interface IUserCredentials {
  email: string;
  password: string;
  token?: string;
}
