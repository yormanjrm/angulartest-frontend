import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/layout/layout.routes').then(r => r.routes),
    },
    {
        path: 'authentication',
        loadComponent: () => import('./features/authentication/authentication.component').then(c => c.AuthenticationComponent)
    },
    {
        path: '**',
        title: '404 Not found',
        loadComponent: () => import('./features/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];