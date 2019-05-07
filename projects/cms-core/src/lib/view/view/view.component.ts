import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {LoginService} from '../../login/login.service';
import {ConfigService} from '../../config/config.service';
import {AuthRedirectRoutes} from '../../config/auth-redirect-routes';

@Component({
  selector: 'cms-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isLoggedIn$: Observable<boolean> = this.login.loggedIn$();

  appName: string;
  redirects: AuthRedirectRoutes;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public config: ConfigService,
    public login: LoginService
  ) {
    this.appName = this.config.appName;
    this.redirects = this.config.authRedirectRoutes;
  }

  ngOnInit() {
  }

}
