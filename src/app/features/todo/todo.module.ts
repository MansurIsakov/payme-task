import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TodoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TodoModule {}
