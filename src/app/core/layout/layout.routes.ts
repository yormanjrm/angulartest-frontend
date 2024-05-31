import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('../../features/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'new-user',
                loadComponent: () => import('../../features/user-form/user-form.component').then(c => c.UserFormComponent)
            },
            {
                path: 'edit-user',
                loadComponent: () => import('../../features/user-form/user-form.component').then(c => c.UserFormComponent)
            }
        ]
    }
];