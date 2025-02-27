import { Routes } from '@angular/router';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { SignInComponent } from './presentation/pages/sign-in/sign-in.component';
import { authGuard } from './presentation/guards/auth.guard';
import { PageNotFoundComponent } from './presentation/pages/page-not-found/page-not-found.component';
import { CallbackComponent } from './presentation/pages/callback/callback.component';
import { SearchComponent } from './presentation/pages/search/search.component';
import { AlbumsComponent } from './presentation/pages/albums/albums.component';
import {
  PRIVATE_ROUTES,
  PUBLIC_ROUTES
} from './presentation/constants/routes-storage.constant';

export const routes: Routes = [
  { path: PUBLIC_ROUTES.SIGN_IN, component: SignInComponent },
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: PRIVATE_ROUTES.SEARCH,
    component: SearchComponent,
    canActivate: [authGuard]
  },
  {
    path: PRIVATE_ROUTES.ALBUMS,
    component: AlbumsComponent,
    canActivate: [authGuard]
  },
  {
    path: PUBLIC_ROUTES.CALLBACK,
    component: CallbackComponent
  },
  {
    path: '',
    redirectTo: PRIVATE_ROUTES.DASHBOARD,
    pathMatch: 'full'
  },

  { path: '**', component: PageNotFoundComponent }
];
