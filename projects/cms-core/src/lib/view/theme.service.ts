import { Injectable } from '@angular/core';
import {StoredLocally} from "../utility/local-storage/stored-locally";
import {ConfigService} from '../config/config.service';

@Injectable()
export class ThemeService {

  @StoredLocally(false) darkThemeOn: boolean;

  constructor(
    private _config: ConfigService
  ) {
    this._setBodyClassAccordingly();
  }

  private _setBodyClassAccordingly() {
    if (this.darkThemeOn) {
      document.body.classList.add(this._config.darkThemeClass);
    } else {
      document.body.classList.remove(this._config.darkThemeClass);
    }
  }

  toggle() {
    this.darkThemeOn = !this.darkThemeOn;
    this._setBodyClassAccordingly();
  }
}
