import { Routes } from '@angular/router';
import { TeamPage } from './pages/team-page';
import { NotFoundPage } from './pages/not-found-page';
import { userIdGuard } from './guards/user-id-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'team', pathMatch: 'full' },
  { path: 'team', component: TeamPage, title: 'Team' },
  {
    path: 'team/:id',
    canActivate: [userIdGuard],
    loadComponent: () =>
      import('./pages/user-details-page').then(m => m.UserDetailsPage),
    title: 'User details',
  },
  { path: '**', component: NotFoundPage, title: 'Page not found' },
];
