import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'album/:albumId',
    renderMode: RenderMode.Client
  },
  {
    path: 'artist/:artistId',
    renderMode: RenderMode.Client
  },
  {
    path: 'track/:trackId',
    renderMode: RenderMode.Client
  },
  {
    path: 'playlist/:playlistId',
    renderMode: RenderMode.Client
  }
];
