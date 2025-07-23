import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnLetter'
})
export class ColumnLetterPipe implements PipeTransform {

  transform(col: number): string {
    return String.fromCharCode(65 + col);
  }

}
