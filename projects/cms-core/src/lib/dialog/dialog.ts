import {Portal} from "@angular/cdk/portal";

export class Dialog<T = any> {

  buttonSet?: Dialog.ButtonSet = Dialog.ButtonSet.OkCancel;
  infoHtml?: string;
  title?: string;

  config: Dialog.Config = {
    width: '400px',
    maxWidth: '90%',
    maxHeight: '90%',
    disableClose: false
  };

  buttonUsage: Dialog.ButtonUsage = {
    Ok: true,
    Cancel: true,
    Yes: false,
    No: false
  };

  // Simple form controls
  textInput: {
    label: string;
    value: string;
  };

  data: any;

  shouldDisableConfirmation: Dialog.ShouldDisableConfirmation;

  usePortal: Portal<T>;

  buttonsUsageFromSet() {
    const bu = this.buttonUsage;
    const bs = this.buttonSet;
    bu.Ok = bs === Dialog.ButtonSet.Ok || bs === Dialog.ButtonSet.OkCancel;
    bu.Cancel = bs === Dialog.ButtonSet.OkCancel;
    bu.Yes = bs === Dialog.ButtonSet.YesNo;
    bu.No = bs === Dialog.ButtonSet.YesNo;
  }

}

export namespace Dialog {

  export interface Config {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    disableClose?: boolean;
  }

  export enum Result {
    Ok = 'ok',
    Cancel = 'cancel',
    Yes = 'yes',
    No = 'no'
  }

  export enum ButtonSet {
    Ok = 'ok',
    OkCancel = 'ok-cancel',
    YesNo = 'yes-no'
  }

  export interface ButtonUsage {
    Ok: boolean;
    Cancel: boolean;
    Yes: boolean;
    No: boolean;
  }

  export type ShouldDisableConfirmation = (dialog: Dialog) => boolean;
}
