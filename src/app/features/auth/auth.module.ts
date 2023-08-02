import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in',
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        title: 'ToDo App | Sign In',
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'ToDo App | Sign Up',
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgHeroiconsModule,
  ],
})
export class AuthModule {}
