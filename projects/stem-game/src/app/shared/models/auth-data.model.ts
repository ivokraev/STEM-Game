export class AuthData {
  constructor(
    public email: string,
    public password: string,
    public isNewUser?: boolean,
  ) {}
}
