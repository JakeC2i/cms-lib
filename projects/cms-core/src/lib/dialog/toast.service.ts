import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class ToastService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  toast(msg: string, timeout: number = 4000) {
    this._snackBar
      .open(msg)
      ._dismissAfter(timeout);
  }
}
