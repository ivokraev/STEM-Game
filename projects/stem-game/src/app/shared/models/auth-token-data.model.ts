import { IAuthResponseData } from './auth-response-data.model';
import { IAuthTokenFromRefreshToken } from './auth-token-from-refresh-token.model';

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

export function AuthTokenDataFromRefresh(
  rereshResponseData: IAuthTokenFromRefreshToken
): AuthTokenData {
  const expirationDate = new Date(
    new Date().getTime() + parseInt(rereshResponseData.expires_in) * 1000
  );
  const inputAuthTokenData: AuthTokenData = new AuthTokenData(
    rereshResponseData.id_token,
    expirationDate,
    rereshResponseData.refresh_token
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
    public refreshToken: string | null,
  ) {}
}
