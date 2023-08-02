import { ToastrService } from 'ngx-toastr';
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

import { TodoService } from '../../todo.service';
import { ITodo } from '../../interfaces/todo.interface';
import { DestroyService } from 'src/app/core/services/destroy.service';

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
    private _todoService: TodoService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _toastr: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
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
      this._todoService
        .getTodoById(this._todoId)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (todo) => {
            this.todoForm.patchValue(todo);
            // This is needed to update the form validation
            this._changeDetectorRef.markForCheck();
          },
          error: (error) => {
            // CHECK
            this._toastr.error(error);
            this._router.navigate(['/todos/todoId']);
          },
        });
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
        this._todoService.createTodo(newTodo).subscribe({
          next: () => {
            this._router.navigate(['/todos']);
            this._toastr.success('Successfully created!');
          },
          error: (error) => {
            this._toastr.error(error);
          },
        });
      } else {
        this._todoService
          .updateTodo(this._todoId, newTodo)
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: () => {
              this._router.navigate([`/todos/${this._todoId}`]);
              this._toastr.success('Successfully updated!');
            },
            error: (error) => {
              this._toastr.error(error);
            },
          });
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
