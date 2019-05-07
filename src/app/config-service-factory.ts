import {ConfigService} from '../../projects/cms-core/src/lib/config/config.service';
import {ComponentPortal} from '@angular/cdk/portal';
import {MenuComponent} from './cms/menu/menu.component';

export function configServiceFactory(): ConfigService {

  const config = new ConfigService();

  config.appName = 'CMS Lib';

  config.apiEndpoint = 'http://localhost:3000';
  config.authApiRoutes = {
    login: 'login',
    logout: 'logout',
    status: 'me'
  };
  config.authRedirectRoutes = {
    onLoggedIn: '/panel',
    onLoggedOut: '/panel/login'
  };

  config.sideNavPortal = new ComponentPortal<MenuComponent>(MenuComponent);

  return config;
}
