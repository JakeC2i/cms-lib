import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResourceListComponent} from './resource-list/resource-list.component';
import {DataModule} from '@jchpro/cms-core';
import {RouterModule} from '@angular/router';
import {ResourceEditComponent} from './resource-edit/resource-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceEditComponent
  ],
  imports: [
    CommonModule,
    DataModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule
  ]
})
export class ResourceModule { }
