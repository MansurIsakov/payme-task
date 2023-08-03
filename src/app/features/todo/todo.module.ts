import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo.component';
import { AuthGuard } from '../auth/auth.guard';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoItemComponent } from './pages/todo-list/components/todo-item/todo-item.component';
import { TodoViewComponent } from './pages/todo-view/todo-view.component';
import { TodoFormComponent } from './pages/todo-form/todo-form.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: TodoListComponent,
        title: "ToDo App | Todo's List",
      },
      {
        path: 'create',
        component: TodoFormComponent,
        title: "ToDo App | Todo's Create",
      },
      {
        path: ':id',
        component: TodoViewComponent,
        title: "ToDo App | Todo's View",
      },
      {
        path: ':id/edit',
        component: TodoFormComponent,
        title: "ToDo App | Todo's Edit",
      },
    ],
  },
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoViewComponent,
    TodoFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    NgHeroiconsModule,
    FilterPipe,
    SearchPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}
