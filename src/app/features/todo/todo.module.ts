import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoItemComponent } from './pages/todo-list/components/todo-item/todo-item.component';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { TodoViewComponent } from './pages/todo-view/todo-view.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: TodoListComponent,
      },
      {
        path: ':id',
        component: TodoViewComponent,
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    NgHeroiconsModule,
    FilterPipe,
    SearchPipe,
    FormsModule,
  ],
})
export class TodoModule {}
