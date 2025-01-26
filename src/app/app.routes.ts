import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'publications',
    pathMatch: 'full',
  },
  {
    path: 'publications',
    loadComponent: () =>
      import('./pages/publications-list/publications-list.page').then(
        (m) => m.PublicationsListPage
      ),
  },
  {
    path: 'add-publication',
    loadComponent: () =>
      import('./pages/add-publication/add-publication.page').then(
        (m) => m.AddPublicationPage
      ),
  },
];

