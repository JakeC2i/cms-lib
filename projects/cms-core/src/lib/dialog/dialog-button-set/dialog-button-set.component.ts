import {Component, Input, OnInit} from '@angular/core';
import {Dialog} from "../dialog";
import {ConfigService} from '../../config/config.service';

@Component({
  selector: 'cms-dialog-button-set',
  templateUrl: './dialog-button-set.component.html',
  styleUrls: ['./dialog-button-set.component.scss']
})
export class DialogButtonSetComponent implements OnInit {

  @Input() dialog: Dialog;

  Result = Dialog.Result;

  constructor(
    public config: ConfigService
  ) { }

  ngOnInit() {
    if (this.dialog && this.dialog.buttonSet) {
      this.dialog.buttonsUsageFromSet();
    }
  }

}
