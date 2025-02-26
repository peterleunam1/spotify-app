import { Observable } from "rxjs";
import { AlbumsModel } from "./albums.entity";

export abstract class AlbumsGateWay {
    abstract getAlbums(singerId: string, token: string): Observable<AlbumsModel>;
}
