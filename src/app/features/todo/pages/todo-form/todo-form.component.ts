import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../todo.service';
import { ITodo } from '../../interfaces/todo.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  public todoForm = this._fb.nonNullable.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
    completed: [false],
  });

  public constructor(
    private _fb: FormBuilder,
    private _todoService: TodoService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  protected onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo = {
      ...this.todoForm.value,
      user: 1,
    };

    if (this._isValidFormValue(newTodo)) {
      this._todoService.createTodo(newTodo).subscribe({
        next: () => {
          this._router.navigate(['/todos']);
          this._toastr.success('Successfully created!');
        },
        error: (error) => {
          this._toastr.error(error);
        },
      });
    }
  }

  private _isValidFormValue(data: Partial<ITodo>): data is ITodo {
    return 'title' in data && 'completed' in data && 'user' in data;
  }
}
