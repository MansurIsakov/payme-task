import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TodoService } from '../../todo.service';
import { ITodo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  public todoList$!: Observable<ITodo[]>;
  public searchValue: string = '';
  public sortValue: string = '';

  public constructor(
    private _todoService: TodoService,
    private _toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this.todoList$ = this._todoService.getTodos().pipe(
      catchError((error) => {
        this._toastr.error(error);
        return throwError(() => error);
      }),
    );
  }
}
