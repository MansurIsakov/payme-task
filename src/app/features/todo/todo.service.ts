import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from './interfaces/todo.interface';
import { catchError, map, throwError } from 'rxjs';
import { IResponse } from 'src/app/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _api = '/api/todo';
  private _endpoints = {
    list: '/',
  };

  public constructor(private _http: HttpClient) {}

  public getTodos() {
    return this._http
      .get<IResponse<ITodo[]>>(`${this._api}${this._endpoints.list}`)
      .pipe(map((res) => res.results))
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
