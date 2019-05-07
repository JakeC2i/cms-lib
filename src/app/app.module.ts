import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {FrontEndModule} from './front-end/front-end.module';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService as CmsConfigService} from '@jchpro/cms-core';
import {configServiceFactory} from './config-service-factory';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StylesLazyLoaderService} from '@jchpro/cms-core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FrontEndModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: CmsConfigService,
      useFactory: configServiceFactory
    },
    StylesLazyLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
