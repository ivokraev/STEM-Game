

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
}
