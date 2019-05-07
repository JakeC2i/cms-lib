import {NgModule, Optional} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {PortalModule} from '@angular/cdk/portal';
import {ViewComponent} from './view/view.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {StylesLazyLoaderService} from '../utility/styles-lazy-loader.service';
import {ConfigService} from '../config/config.service';
import {ThemeService} from './theme.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    PortalModule,
    MatButtonModule
  ],
  declarations: [
    ViewComponent,
    NavigationBarComponent
  ],
  exports: [
    ViewComponent,
    NavigationBarComponent,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [
    ThemeService
  ]
})
export class ViewModule {

  constructor(
    @Optional() lazyLoader: StylesLazyLoaderService,
    config: ConfigService
  ) {
    if (lazyLoader && config.stylesToLazyLoad.length) {
      lazyLoader.loadStyleFromUrls(
        config.stylesToLazyLoad
      );
    }
  }

}
