import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { MainNavComponent } from './common/main-nav.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './common/header.component';

@NgModule({
  declarations: [LayoutComponent, MainNavComponent],
  imports: [CommonModule, NgHeroiconsModule, RouterModule, HeaderComponent],
})
export class LayoutModule {}
