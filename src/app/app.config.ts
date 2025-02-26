import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';
import { AuthGateway } from './domain/auth/auth.gateway';
import { AuthService } from './infrastructure/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { TokenGateway } from './domain/token/token.gateway';
import { TokenService } from './infrastructure/token/token.service';
import { SingerGateway } from './domain/singers/singer.gateway';
import { SingersService } from './infrastructure/singers/singers.service';
import { AlbumsGateWay } from './domain/albums/albums.gateway';
import { AlbumsService } from './infrastructure/albums/albums.service';
import { TracksService } from './infrastructure/tracks/tracks.service';
import { TracksGateWay } from './domain/tracks/tracks.gateway';
import { ProfileGateWay } from './domain/profile/profile.gateway';
import { ProfileService } from './infrastructure/profile/profile.service';
import { PlaylistsGateWay } from './domain/playlists/playlists.gateway';
import { PlaylistsService } from './infrastructure/playlists/playlists.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: AuthGateway, useClass: AuthService },
    { provide: TokenGateway, useClass: TokenService },
    { provide: SingerGateway, useClass: SingersService },
    { provide: AlbumsGateWay, useClass: AlbumsService },
    { provide: TracksGateWay, useClass: TracksService },
    { provide: ProfileGateWay, useClass: ProfileService },
    { provide: PlaylistsGateWay, useClass: PlaylistsService },
  ],
};
