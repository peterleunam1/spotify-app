export abstract class TokenGateway {
  abstract saveToken(): void;
  abstract getToken(): Promise<string>;
  abstract removeToken(): void;
  abstract updateToken(token: string): void;
}
