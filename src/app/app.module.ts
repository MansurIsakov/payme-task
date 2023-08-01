import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgHeroiconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
