import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'client',
        loadComponent: () => import('./page/client/client.component').then(c => c.ClientComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'client'
    }
];
