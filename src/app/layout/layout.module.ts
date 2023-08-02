import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MainNavComponent } from './common/main-nav.component';
import { HeaderComponent } from './common/header.component';

@NgModule({
  declarations: [LayoutComponent, MainNavComponent],
  imports: [CommonModule, NgHeroiconsModule, RouterModule, HeaderComponent],
})
export class LayoutModule {}
