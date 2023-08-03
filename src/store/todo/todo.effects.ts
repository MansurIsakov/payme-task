import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as TodoActions from './todo.actions';
import { TodoService } from 'src/app/features/todo/todo.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private _todoService: TodoService, private _toastr: ToastrService, private _router: Router) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        return this._todoService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos: todos })),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message }))
            
        ))}
      )
    )
  );

  getTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodo),
      mergeMap((action) =>
        this._todoService.getTodoById(action.id).pipe(
          map((todo) => TodoActions.getTodoSuccess({ todo: todo })),
          catchError((error) => {
            this._router.navigate(['/todos']);
            return of(TodoActions.getTodoFailure({ error: error.message }))
          })
        )
      )
    ));


    addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap((action) =>
        this._todoService.createTodo(action.todo).pipe(
          map((todo) => TodoActions.addTodoSuccess({ todo })),
          tap(() => {
            this._router.navigate(['/todos']);
            this._toastr.success('Successfully created!');
          }),
          catchError((error) =>
            of(TodoActions.addTodoFailure({ error: error.message }))
          )
        )
      )
    ));

    deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((action) =>
        this._todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          tap(() => {
            this._toastr.success('Todo deleted successfully!');
            this._router.navigate(['/todos'])
          }),
          catchError((error) =>
            of(TodoActions.deleteTodoFailure({ error: error.message }))
          )
        )
      )
    ))      

    updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((action) =>
        this._todoService.updateTodo(action.id, action.todo).pipe(
          map(() => TodoActions.updateTodoSuccess({ id: action.id, todo: action.todo  })),
          tap(() => {
            this._router.navigate([`/todos/${action.id}`]);
            this._toastr.success('Successfully updated!');
          }),
          catchError((error) =>
            of(TodoActions.updateTodoFailure({ error: error.message }))
          )
        )
      )
    ))

}
