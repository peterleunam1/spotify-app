import { Observable } from "rxjs";

export abstract class TokenGateway {
    abstract saveToken(): void;
    abstract getToken(): string;
    abstract removeToken(): void;
    abstract updateToken(token: string): void;
}
