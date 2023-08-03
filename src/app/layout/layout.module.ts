import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from '@layout/layout.component';
import { MainNavComponent } from '@layout/common/main-nav.component';
import { HeaderComponent } from '@layout/common/header.component';

@NgModule({
  declarations: [LayoutComponent, MainNavComponent],
  imports: [CommonModule, NgHeroiconsModule, RouterModule, HeaderComponent],
})
export class LayoutModule {}
