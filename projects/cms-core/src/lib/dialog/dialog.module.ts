import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from "@angular/material";
import {DialogComponent} from './dialog/dialog.component';
import {PortalDialogComponent} from './portal-dialog/portal-dialog.component';
import {DialogButtonSetComponent} from './dialog-button-set/dialog-button-set.component';
import {PortalModule} from "@angular/cdk/portal";
import {DialogService} from "./dialog.service";
import {FormsModule} from "@angular/forms";
import {ErrorService} from "./error.service";
import {ToastService} from "./toast.service";

@NgModule({
  declarations: [
    DialogComponent,
    PortalDialogComponent,
    DialogButtonSetComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    PortalModule,
    MatSnackBarModule,
    MatInputModule
  ],
  exports: [
    DialogComponent,
    PortalDialogComponent,
    DialogButtonSetComponent
  ],
  entryComponents: [
    DialogComponent,
    PortalDialogComponent
  ],
  providers: [
    DialogService,
    ErrorService,
    ToastService
  ]
})
export class DialogModule { }
