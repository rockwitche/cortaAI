import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'barbearias' },
  {
    path: 'barbearias',
    loadComponent: () => import('./pages/barbearias-busca/barbearias-busca').then(m => m.BarbeariasBuscaComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro').then(m => m.RegistroComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'dashboard/agenda',
    loadComponent: () =>
      import('./pages/dashboard/agenda/agenda').then((m) => m.AgendaComponent),
  },
  { path: '**', redirectTo: 'barbearias' },
];
