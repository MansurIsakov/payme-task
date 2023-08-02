import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from './interfaces/todo.interface';
import { catchError, map, throwError } from 'rxjs';
import { IResponse } from 'src/app/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _api = '/api/todo/';

  public constructor(private _http: HttpClient) {}

  public getTodos() {
    return this._http.get<IResponse<ITodo[]>>(`${this._api}`).pipe(
      map((res) => res.results),
      catchError(this.handleError)
    );
  }

  public getTodoById(id: string) {
    return this._http
      .get<ITodo>(`${this._api}${id}/`)
      .pipe(catchError(this.handleError));
  }

  public createTodo(newTodo: ITodo) {
    return this._http
      .post<IResponse<ITodo>>(`${this._api}`, newTodo)
      .pipe(catchError(this.handleError));
  }

  public deleteTodo(id: string) {
    return this._http
      .delete(`${this._api}${id}/`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }

    return throwError(() => errorMessage);
  }
}
