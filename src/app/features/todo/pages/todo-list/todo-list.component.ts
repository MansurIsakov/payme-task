import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Observable } from 'rxjs';
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

  public constructor(private _todoService: TodoService) {}

  public ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this.todoList$ = this._todoService.getTodos();
  }
}
