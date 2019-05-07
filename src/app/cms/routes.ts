import {Route} from '@angular/router';
import {ViewComponent, LoginComponent, AuthGuard} from '@jchpro/cms-core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ResourceListComponent} from './resource/resource-list/resource-list.component';
import {ResourceEditComponent} from './resource/resource-edit/resource-edit.component';
import {ResourceResolver} from './resource/resource-resolver';

export const routes: Route[] = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DashboardComponent
          },
          {
            path: 'resource',
            component: ResourceListComponent
          },
          {
            path: 'resource/:ResourceId',
            component: ResourceEditComponent,
            resolve: {
              resource: ResourceResolver
            }
          }
        ]
      }
    ]
  }
];
