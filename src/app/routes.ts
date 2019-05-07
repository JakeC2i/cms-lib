import {Route} from '@angular/router';
import {IndexComponent} from './front-end/index/index.component';

export const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
      },
      {
        path: 'panel',
        loadChildren: './cms/cms.module#CmsModule'
      }
    ]
  }
];
