import { Observable, takeUntil } from 'rxjs';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ITodo } from '../../interfaces/todo.interface';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store';
import { addTodo, getTodo, updateTodo } from 'src/store/todo/todo.actions';
import { selectTodo } from 'src/store/todo/todo.selector';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TodoFormComponent implements OnInit {
  public isCreateMode: boolean = false;
  public todoForm = this._fb.nonNullable.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
    completed: [false],
  });
  private _todoId = this._activatedRouter.snapshot.params['id'];

  public constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store<AppState>,
    @Inject(DestroyService) private _destroy$: Observable<void>,
  ) {}

  public ngOnInit(): void {
    this.isCreateMode = this._isCreateMode();

    if (!this.isCreateMode) {
      this.fillForm();
    }
  }

  public fillForm(): void {
    if (this._todoId) {
      this._store.dispatch(getTodo({id: this._todoId}));
      this._store.select(selectTodo)
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (todo) => {
          if (todo) {
            this.todoForm.patchValue(todo)}
            this._changeDetectorRef.markForCheck();
        }
      );
    }
  }

  protected onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo = {
      ...this.todoForm.value,
      user: 1,
    };

    if (this._isValidFormValue(newTodo)) {
      // Checking Form Mode
      if (this.isCreateMode) {
          this._store.dispatch(addTodo({ todo: newTodo }));
      } else {
        this._store.dispatch(updateTodo({id: this._todoId, todo: newTodo}))
      }
    }
  }

  private _isValidFormValue(data: Partial<ITodo>): data is ITodo {
    return 'title' in data && 'completed' in data && 'user' in data;
  }

  private _isCreateMode(): boolean {
    return this._router.url.includes('create');
  }
}
