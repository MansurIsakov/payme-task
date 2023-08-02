import { ToastrModule } from 'ngx-toastr';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AuthInterceptorService } from './features/auth/auth-interceptor.service';
import { LoaderInterceptor } from './core/interceptors/loader-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgHeroiconsModule,
    LayoutModule,
    HttpClientModule,
    LoaderComponent,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OverlayModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
