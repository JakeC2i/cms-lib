import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Dialog} from '../dialog';

@Component({
  selector: 'cms-portal-dialog',
  templateUrl: './portal-dialog.component.html',
  styleUrls: ['./portal-dialog.component.scss']
})
export class PortalDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog: Dialog,
    private _dialogRef: MatDialogRef<PortalDialogComponent, Dialog.Result>
  ) { }

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
