import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { roleGuard } from '../guards/role.guard';

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
                title: 'Dashboard',
                loadComponent: () => import('../../features/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'new-user',
                title: 'New user',
                canActivate: [roleGuard],
                loadComponent: () => import('../../features/user-form/user-form.component').then(c => c.UserFormComponent)
            },
            {
                path: 'edit-user',
                title: 'Edit user',
                canActivate: [roleGuard],
                loadComponent: () => import('../../features/user-form/user-form.component').then(c => c.UserFormComponent)
            }
        ]
    }
];