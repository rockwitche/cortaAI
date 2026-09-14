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
  { path: '**', redirectTo: 'barbearias' },
];
