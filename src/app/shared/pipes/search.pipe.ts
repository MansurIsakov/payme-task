import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, searchString: string, propName: string) {
    if (value.length === 0 || searchString === '' || propName === '') {
      return value;
    }

    const resultArray = [];

    for (const item of value) {
      if (
        item[propName]
          .toLowerCase()
          .trim()
          .includes(searchString.toLowerCase().trim())
      ) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
