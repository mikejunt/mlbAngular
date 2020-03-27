import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'era'
})
export class EraPipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(2);
  }

}
