import { Injectable } from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {AuthApiRoutes} from './auth-api-routes';
import {AuthRedirectRoutes} from './auth-redirect-routes';
import {CoreTranslation} from './core-translation';

/**
 * You must provide this service yourself
 */
@Injectable()
export class ConfigService {

  appName: string = 'cms-app';
  apiEndpoint?: string;
  authApiRoutes?: AuthApiRoutes;
  authRedirectRoutes?: AuthRedirectRoutes;
  sideNavPortal?: ComponentPortal<any>;

  get darkThemeClass(): string {
    return 'cms-dark-theme';
  };

  crudPagingTotalHeader: string = 'Pro-Documents-Total';
  incorrectPasswordError: string = 'IncorrectPasswordError';
  stylesToLazyLoad: string[] = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
  ];

  translation = new CoreTranslation();
}
