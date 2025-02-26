import { Observable } from "rxjs";
import { SingerResponse } from "./singer.entity";

export abstract class SingerGateway {
    abstract getAnArtist(name: string, token: string): Observable<SingerResponse>;
}
