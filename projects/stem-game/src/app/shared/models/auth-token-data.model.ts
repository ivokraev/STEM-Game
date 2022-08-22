import { IAuthResponseData } from './auth-response-data.model';

export function AuthTokenDataFromResponse(
  authResponseData: IAuthResponseData
): AuthTokenData {
  const expirationDate = new Date(
    new Date().getTime() + parseInt(authResponseData.expiresIn) * 1000
  );
  const inputAuthTokenData: AuthTokenData = new AuthTokenData(
    authResponseData.idToken,
    expirationDate,
    authResponseData.refreshToken
  );
  return inputAuthTokenData;
}

export interface IAuthTokenData {
  token: string | null;
  expirationDate: Date | null;
  refreshToken: string | null;
}

export class AuthTokenData implements IAuthTokenData {
  constructor(
    public token: string | null,
    public expirationDate: Date | null,
    public refreshToken: string | null
  ) {}
}
