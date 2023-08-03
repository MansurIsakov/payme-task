import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ITodo } from '../../interfaces/todo.interface';
import { selectTodos } from 'src/store/todo/todo.selector';
import { AppState } from 'src/store';
import { loadTodos } from 'src/store/todo/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  public todoList$: Observable<ITodo[]> = this._store.select(selectTodos);
  public searchValue: string = '';
  public sortValue: string = '';

  public constructor(private _store: Store<AppState>) {}

  public ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this._store.dispatch(loadTodos());    
  }
}
