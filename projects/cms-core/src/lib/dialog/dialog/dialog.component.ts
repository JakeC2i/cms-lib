import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Dialog} from "../dialog";
import {Portal} from "@angular/cdk/portal";

@Component({
  selector: 'cms-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {
    '(keydown)': 'onKeyDown($event)'
  }
})
export class DialogComponent {

  portal: Portal<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog: Dialog,
    private _dialogRef: MatDialogRef<DialogComponent, Dialog.Result>
  ) {
    this.portal = dialog.usePortal;
  }

  onKeyDown(event: KeyboardEvent) {
    const key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13) {
      if (this.dialog.shouldDisableConfirmation) {
        if (this.dialog.shouldDisableConfirmation(this.dialog))
          return;
      }
      if (this.dialog.buttonSet === Dialog.ButtonSet.YesNo) {
        return this._dialogRef.close(Dialog.Result.Yes)
      }
      return this._dialogRef.close(Dialog.Result.Ok);
    }
  }

}
