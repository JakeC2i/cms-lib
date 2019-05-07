import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {LoginService} from '../login.service';
import {ErrorService} from '../../dialog/error.service';
import {ConfigService} from '../../config/config.service';
import {LoginFormData} from '../login-form-data';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  loginForm: FormGroup;

  constructor(
    public config: ConfigService,
    private _formBuilder: FormBuilder,
    public loginService: LoginService,
    private _error: ErrorService
  ) {
    this.loginForm = this._formBuilder.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
    });
  }

  onFormSubmit(): void {
    const form = this.loginForm;
    let formData: LoginFormData;

    if (form.valid) {
      formData = form.value;
      this.loginService.login(formData)
        .subscribe(() => {}, (err) => {
          if (err.error && err.error.appName === this.config.incorrectPasswordError) {
            err.error = {
              name: 'Błąd logowania',
              message: 'Nieprawidłowa nazwa użytkownika lub hasło'
            };
          }
          this._error.throwToast(err.error || err);
          this.loginForm.controls['password'].setValue('');
        });
    }
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
