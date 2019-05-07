import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {ViewModule, LoginModule, DataModule} from '@jchpro/cms-core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import {ResourceModule} from './resource/resource.module';
import {MatPaginatorModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    DataModule,
    ViewModule,
    LoginModule,
    ResourceModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    MenuComponent
  ]
})
export class CmsModule { }
