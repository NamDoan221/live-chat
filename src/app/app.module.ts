import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzI18nService, NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconsProviderModule } from './lib/icon-ant/icons-provider.module';
import { UserCanActive } from './lib/services/auth/auth.service';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BmNotFoundComponent } from './not-found/not-found.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as duration from 'dayjs/plugin/duration';
import * as quarterOfYear from 'dayjs/plugin/quarterOfYear';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)
dayjs.extend(isoWeek)
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(quarterOfYear)
registerLocaleData(vi);

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BmNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    NzResultModule,
    NzButtonModule,
    NzMessageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    UserCanActive
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService, private i18n: NzI18nService) {
    this.translate.setDefaultLang('vi');
    this.i18n.setLocale(vi_VN);
  }
}
