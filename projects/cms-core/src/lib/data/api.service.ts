import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigService} from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // TODO also check for the trailing /
  static joinRoute(route: string | string[]): string {
    let joinedRoute: string;
    if (Array.isArray(route)) {
      joinedRoute = route
        .map( r => r[0] === '/' ? r.substr(1) : r)
        .map((r, i) => i === 0 ? r : `/${r}`).join('');
    } else {
      joinedRoute = route[0] === '/' ? route : `/${route}`;
    }
    return joinedRoute;
  }

  private _joinApiRoute(route: string): string {
    return ApiService.joinRoute([this.apiEndpoint, route]);
  }

  readonly apiEndpoint: string;

  private _getOptionsObserveBody(params?: HttpParams): {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } {
    return {
      withCredentials: true,
      observe: 'body',
      responseType: 'json',
      params
    };
  }

  constructor(
    private _http: HttpClient,
    private _config: ConfigService
  ) {
    if (!_config.apiEndpoint) {
      console.warn('API endpoint has not been defined');
      return;
    }
    this.apiEndpoint = this._config.apiEndpoint;
  }

  get<T>(apiRoute: string, params?: HttpParams): Observable<T> {
    return this._http
      .get<T>(this._joinApiRoute(apiRoute), this._getOptionsObserveBody(params));
  }

  post<T>(apiRoute: string, body: any = null, params?: HttpParams): Observable<T> {
    return this._http
      .post<T>(this._joinApiRoute(apiRoute), body, this._getOptionsObserveBody(params));
  }

  put<T>(apiRoute: string, body: any = null, params?: HttpParams): Observable<T> {
    return this._http
      .put<T>(this._joinApiRoute(apiRoute), body, this._getOptionsObserveBody(params));
  }

  delete<T>(apiRoute: string, params?: HttpParams): Observable<T> {
    return this._http
      .delete<T>(this._joinApiRoute(apiRoute), this._getOptionsObserveBody(params));
  }

  getResponse<T>(apiRoute: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this._http
      .get<T>(this._joinApiRoute(apiRoute), {
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
        params
      });
  }

  // TODO: other raw responses (post, put, delete)
}
