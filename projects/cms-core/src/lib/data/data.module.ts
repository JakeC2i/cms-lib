import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollectionViewMatPaginatorDirective} from './collection-view/collection-view-mat-paginator.directive';
import {CollectionViewMatTableDirective} from './collection-view/collection-view-mat-table.directive';
import {MatButtonModule, MatIconModule, MatPaginatorModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    CollectionViewMatTableDirective,
    CollectionViewMatPaginatorDirective
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CollectionViewMatTableDirective,
    CollectionViewMatPaginatorDirective,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DataModule { }
