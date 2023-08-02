import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

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
