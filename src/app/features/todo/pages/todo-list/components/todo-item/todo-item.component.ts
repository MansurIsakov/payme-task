import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ITodo } from '@todo/interfaces/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: ITodo;

  public constructor(private _router: Router) {}

  public onTodoClick(id: string | undefined): void {
    this._router.navigate(['todos', id]);
  }
}
