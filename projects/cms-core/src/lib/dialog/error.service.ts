import { Injectable } from '@angular/core';
import {DialogService} from "./dialog.service";
import {ToastService} from "./toast.service";
import {ConfigService} from '../config/config.service';

@Injectable()
export class ErrorService {

  constructor(
    private _dialog: DialogService,
    private _toast: ToastService,
    private _config: ConfigService
  ) { }

  throwDialog(err: Error) {
    this._dialog.information(err.message, err.name || this._config.translation.error.genericError);
  }

  throwToast(err: Error, timeout: number = 8000) {
    this._toast.toast(err.message, timeout);
  }
}
