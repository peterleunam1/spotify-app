import { Routes } from '@angular/router';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { SignInComponent } from './presentation/pages/sign-in/sign-in.component';
import { authGuard } from './presentation/guards/auth.guard';
import { PageNotFoundComponent } from './presentation/pages/page-not-found/page-not-found.component';
import { CallbackComponent } from './presentation/components/callback/callback.component';
import { SearchComponent } from './presentation/pages/search/search.component';
import { AlbumsComponent } from './presentation/pages/albums/albums.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard]
  },
  {
    path: 'albums/:singerId',
    component: AlbumsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  { path: '**', component: PageNotFoundComponent }
];
