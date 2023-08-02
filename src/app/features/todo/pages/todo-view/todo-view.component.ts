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

  constructor(
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
    const todoId: string = this._activatedRouter.snapshot.params['id'];

    this.todo$ = this._todoService.getTodoById(todoId).pipe(
      takeUntil(this._destroy$),
      catchError((error) => {
        this._toastr.error(error);
        this._router.navigate(['/todos']);
        return throwError(() => error);
      })
    );
  }
}
