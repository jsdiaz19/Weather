import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpInterceptorInterceptor } from './httpInterceptor/http-interceptor.interceptor';
import { WeatherComponent } from './components/weather/weather.component';
import { HistorialComponent } from './components/historial/historial.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { IsFavoritePipe } from './pipe/isFavorite/is-favorite.pipe';
import {MatDialogModule} from '@angular/material/dialog';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    HistorialComponent,
    FavoriteComponent,
    IsFavoritePipe,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, multi:true, useClass: HttpInterceptorInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
