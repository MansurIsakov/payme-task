import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { TodoService } from '../../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { Observable, catchError, of, takeUntil, throwError } from 'rxjs';
import { ITodo } from '../../interfaces/todo.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class TodoViewComponent implements OnInit {
  public todo$!: Observable<ITodo>;
  private _todoId: string = this._activatedRouter.snapshot.params['id'];

  public constructor(
    private _todoService: TodoService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    @Inject(DestroyService) private _destroy$: Observable<void>
  ) {}

  ngOnInit(): void {
    this.getTodoById();
  }

  public getTodoById() {
    this.todo$ = this._todoService.getTodoById(this._todoId).pipe(
      catchError((error) => {
        this._toastr.error(error);
        this._router.navigate(['/todos']);
        return throwError(() => error);
      })
    );
  }

  public onDelete() {
    this._todoService
      .deleteTodo(this._todoId)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          this._toastr.success('Todo deleted successfully!');
          this._router.navigate(['/todos']);
        },
        error: (error) => {
          this._toastr.error(error);
        },
      });
  }
}
