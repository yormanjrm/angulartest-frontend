import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./core/layout/layout.routes').then(r => r.routes),
    },
    {
        path: 'authentication',
        canActivate: [loggedInGuard],
        loadComponent: () => import('./features/authentication/authentication.component').then(c => c.AuthenticationComponent)
    },
    {
        path: '**',
        title: '404 Not found',
        loadComponent: () => import('./features/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];