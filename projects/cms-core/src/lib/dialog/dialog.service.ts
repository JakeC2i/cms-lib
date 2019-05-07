import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {Dialog} from "./dialog";
import {Observable} from "rxjs";
import {DialogComponent} from "./dialog/dialog.component";
import {map} from "rxjs/operators";
import {Portal} from "@angular/cdk/portal";
import {ConfigService} from '../config/config.service';

@Injectable()
export class DialogService {

  private _lastDialogId: string;

  private _showDialog<T = Dialog.Result>(dialog: Dialog): Observable<T> {
    const matDialog = this._dialog
      .open(
        DialogComponent,
          {
          width: dialog.config.width,
          height: dialog.config.height,
          maxWidth: dialog.config.maxWidth,
          maxHeight: dialog.config.maxHeight,
          disableClose: dialog.config.disableClose,
          data: dialog
        }
      );
    this._lastDialogId = matDialog.id;
    return matDialog.afterClosed();
  }

  constructor(
    private _dialog: MatDialog,
    private _config: ConfigService
  ) { }

  showDialog<T = Dialog.Result>(dialog: Dialog): Observable<T> {
    return this._showDialog<T>(dialog);
  }

  openPortalDialog<TR = Dialog.Result, TC = any>(portal: Portal<TC>, title: string, configurator?: (dialog: Dialog) => void): Observable<TR> {
    const dialog = new Dialog();
    dialog.usePortal = portal;
    dialog.title = title;
    if (typeof configurator === 'function') {
      configurator(dialog);
    }
    return this._showDialog(dialog);
  }

  yesNoQuestion(question: string, title?: string, canSkip: boolean = true): Observable<Dialog.Result> {
    const dialog = new Dialog();
    dialog.buttonSet = Dialog.ButtonSet.YesNo;
    dialog.infoHtml = question;
    dialog.title = title || this._config.translation.dialog.titleQuestion;
    dialog.config.disableClose = !canSkip;
    return this._showDialog(dialog);
  }

  information(info: string, title?: string) {
    const dialog = new Dialog();
    dialog.buttonSet = Dialog.ButtonSet.Ok;
    dialog.infoHtml = info;
    dialog.title = title || this._config.translation.dialog.titleInformation;
    return this._showDialog(dialog);
  }

  textInput(label:string, value?: string, info?: string, title?: string, disableWhen?: Dialog.ShouldDisableConfirmation): Observable<string> {
    const dialog = new Dialog();
    dialog.buttonSet = Dialog.ButtonSet.OkCancel;
    dialog.infoHtml = info;
    dialog.title = title || this._config.translation.dialog.titleInput;
    dialog.textInput = { label, value };
    dialog.shouldDisableConfirmation = disableWhen;
    return this._showDialog(dialog)
      .pipe(
        map(res => {
          if (res === Dialog.Result.Ok) {
            return dialog.textInput.value;
          }
          return null;
        })
      );
  }
}
