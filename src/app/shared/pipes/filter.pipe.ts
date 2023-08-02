import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from 'src/app/features/todo/interfaces/todo.interface';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  private _resultArray: ITodo[] = [];

  transform(value: ITodo[], filterString: string, propName: string) {
    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }

    this._resultArray = [];

    this.iterateTodos(filterString, value, propName);

    return this._resultArray;
  }

  private iterateTodos(filterString: string, value: any, propName: string) {
    for (const item of value) {
      if (item[propName] === (filterString === 'true')) {
        this._resultArray.push(item);
      }
    }
  }
}
