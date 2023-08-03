import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITodo } from '../../interfaces/todo.interface';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store';
import { deleteTodo, getTodo } from 'src/store/todo/todo.actions';
import { selectTodo } from 'src/store/todo/todo.selector';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TodoViewComponent implements OnInit {
  public todo$: Observable<ITodo | undefined> = this._store.select(selectTodo);
  private _todoId: string = this._activatedRouter.snapshot.params['id'];

  public constructor(
    private _activatedRouter: ActivatedRoute,
    private _store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.getTodoById();
  }

  public getTodoById() {
    this._store.dispatch(getTodo({id: this._todoId}));
  }

  public onDelete() {
    this._store.dispatch(deleteTodo({id: this._todoId}));
  }
}
