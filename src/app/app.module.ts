import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
import { TodoEffects } from 'src/store/todo/todo.effects';
import { reducers } from 'src/store';

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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
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
