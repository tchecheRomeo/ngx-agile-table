import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgxAgileTableModule} from 'ngx-agile-table';
import {DecimalPipe} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxAgileTableModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateHttpLoader
      }
    })
  ],
  providers: [
    DecimalPipe,
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json',
        enforceLoading: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
