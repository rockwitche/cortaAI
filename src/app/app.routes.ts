import { Routes } from '@angular/router';
import { barberGuard } from './auth/barber.guard';
import { sessionGuard } from './auth/session.guard';

export const routes: Routes = [
  {
    path: 'meus-agendamentos',
    canActivate: [sessionGuard],
    loadComponent: () => import('./pages/meus-agendamentos/meus-agendamentos').then(m => m.MeusAgendamentosComponent),
  },
  {
    path: 'auth/google/callback',
    loadComponent: () => import('./auth/google-callback').then(m => m.GoogleCallbackComponent),
  },
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
    path: 'perfil',
    canActivate: [sessionGuard],
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.PerfilComponent),
  },
  {
    path: 'agendar/:slug',
    loadComponent: () =>
      import('./pages/agendar/agendar').then((m) => m.AgendarComponent),
  },
  {
    path: 'dashboard',
    canActivate: [barberGuard],
    canActivateChild: [barberGuard],
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
