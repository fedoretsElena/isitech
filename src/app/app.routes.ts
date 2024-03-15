import { Routes } from '@angular/router';

import { UserViewComponent } from './manage-users/components';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ManageUsersComponent } from './manage-users/components/manage-users/manage-users.component';

export const routes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    children: [
      {
        path: 'create',
        component: UserViewComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit/:id',
        component: UserViewComponent,
      },
      {
        path: 'edit/:id/not-found',
        component: PageNotFoundComponent,
        data: {
          secondaryText: "we couldn't find that user",
          adviceText: 'Try another one.',
        },
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
