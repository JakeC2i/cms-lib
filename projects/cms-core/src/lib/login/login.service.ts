import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {ConfigService} from '../config/config.service';
import {Router} from '@angular/router';
import {LoginState} from './login-state';
import {AuthApiRoutes} from '../config/auth-api-routes';
import {AuthRedirectRoutes} from '../config/auth-redirect-routes';
import {ApiService} from '../data/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService<TUser = any> {

  static readonly LoginApiOptions = {
    withCredentials: true
  };

  private _loginState: LoginState<TUser> = {
    loggedIn: false
  };
  private _loginState$ = new BehaviorSubject<LoginState<TUser>>(undefined);
  public loginState$(): Observable<LoginState<TUser>> {
    return this._loginState$
      .asObservable()
      .pipe(
        filter(s => s !== undefined)
      )
  }
  public loggedIn$(): Observable<boolean> {
    return this.loginState$().pipe(
      map(s => s.loggedIn)
    );
  }
  public get loggedIn(): boolean {
    return this._loginState.loggedIn;
  }
  public user$(): Observable<TUser> {
    return this.loginState$().pipe(
      map(s => s.user)
    );
  }

  public get isConfigured(): boolean {
    return !!this._config.apiEndpoint && !!this._config.authRedirectRoutes;
  }
  private _isConfiguredFor(action: keyof AuthApiRoutes): boolean {
    return this.isConfigured && !!this._apiRoutes[action];
  }

  private _updateAndEmitState(newState: LoginState<TUser>) {
    this._loginState = newState;
    this._loginState$.next(this._loginState);
  }

  private _apiRoutes: AuthApiRoutes;
  private _redirectRoutes: AuthRedirectRoutes;
  private _readConfig() {

    // Is API endpoint defined
    if (!this.isConfigured) {
      console.warn('LoginService is not configured');
      return;
    }

    // Read standard logging actions URLs
    this._apiRoutes = this._config.authApiRoutes;
    // const routes = this._config.authApiRoutes;
    // ['login', 'logout', 'status']
    //   .forEach(action => {
    //     if (routes[action]) {
    //       this._actionUrls[action]
    //         = ApiService.joinRoute([this._config.apiEndpoint, routes[action]]);
    //     }
    //   });

    // Read redirect routes
    this._redirectRoutes = this._config.authRedirectRoutes;
  }
  private _redirect(commands: any[]) {
    const noop = () => {};
    this._router.navigate(commands)
      .then(noop)
      .catch(noop);
  }
  private _bindLogoutRedirect() {

    if (!this._redirectRoutes)
      return;

    this.user$()
      .pipe(
        filter(maybeUser => !maybeUser)
      )
      .subscribe(() => {
        this._redirect([this._redirectRoutes.onLoggedOut]);
      })
  }

  constructor(
    private _api: ApiService,
    // private _httpClient: HttpClient,
    private _config: ConfigService,
    private _router: Router
  ) {
    this._readConfig();
    this._bindLogoutRedirect();
    this.checkStatus();
  }

  checkStatus() {
    if (!this._isConfiguredFor('status')) return;

    this._api.get(this._apiRoutes.status)
      .subscribe((state: LoginState<TUser>) => {
        this._updateAndEmitState(state);
      }, err => {
        console.error(err);
      });
  }

  login(loginBody: any): Observable<LoginState<TUser>> {
    if (!this._isConfiguredFor('login'))
      return of({loggedIn: false});

    return this._api.post(this._apiRoutes.login, loginBody)
      .pipe(
        tap((state: LoginState<TUser>) => {
          this._updateAndEmitState(state);
          if (state.loggedIn) {
            this._redirect([this._redirectRoutes.onLoggedIn]);
          }
        })
      );
  }

  logout() {
    if (!this._isConfiguredFor('logout')) return;

    this._api.post(this._apiRoutes.logout, {})
      .subscribe((state: LoginState<TUser>) => {
        this._updateAndEmitState(state);
      }, err => {
        console.error(err);
      });
  }
}
