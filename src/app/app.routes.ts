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
    children: [
      {
        path: 'barbearias',
        loadComponent: () =>
          import('./pages/dashboard/barbearias-list/barbearias-list').then((m) => m.BarbeariasListComponent),
      },
      {
        path: 'barbearias/nova',
        loadComponent: () =>
          import('./pages/dashboard/barbearia-form/barbearia-form').then((m) => m.BarbeariaFormComponent),
      },
      {
        path: 'barbearias/:id',
        loadComponent: () =>
          import('./pages/dashboard/barbearia-form/barbearia-form').then((m) => m.BarbeariaFormComponent),
      },
      {
        path: 'agenda',
        loadComponent: () =>
          import('./pages/dashboard/agenda/agenda').then((m) => m.AgendaComponent),
      },
      {
        path: 'planos',
        loadComponent: () => import('./pages/dashboard/planos/planos').then((m) => m.PlanosComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'barbearias' },
];
