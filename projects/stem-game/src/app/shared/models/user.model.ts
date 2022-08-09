import { IAuthResponseData } from "./auth-response-data.model";

export function createUser(authResponseData: IAuthResponseData): User {
  const expiresIn = parseInt(authResponseData.expiresIn)
  const tokenExpansionDate  = new Date(new Date().getTime() + expiresIn * 1000);
  return new User(
    authResponseData.email,
    authResponseData.localId,
    authResponseData.idToken,
    tokenExpansionDate
  );
}
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string {
    if(this._tokenExpirationDate && this._tokenExpirationDate.getTime() > Date.now())
      return this._token;
    return '';
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
