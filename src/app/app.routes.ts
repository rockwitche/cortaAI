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
    path: 'dashboard/barbearias',
    loadComponent: () =>
      import('./pages/dashboard/barbearias-list/barbearias-list').then((m) => m.BarbeariasListComponent),
  },
  {
    path: 'dashboard/barbearias/nova',
    loadComponent: () =>
      import('./pages/dashboard/barbearia-form/barbearia-form').then((m) => m.BarbeariaFormComponent),
  },
  {
    path: 'dashboard/barbearias/:id',
    loadComponent: () =>
      import('./pages/dashboard/barbearia-form/barbearia-form').then((m) => m.BarbeariaFormComponent),
  },
  {
    path: 'dashboard/agenda',
    loadComponent: () =>
      import('./pages/dashboard/agenda/agenda').then((m) => m.AgendaComponent),
  },
  { path: '**', redirectTo: 'barbearias' },
];
