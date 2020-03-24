import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFirstLast'
})
export class NameFirstLastPipe implements PipeTransform {

  transform(name: string): string {
    let fixed = name.split(", ").reverse().join(" ")
    return fixed
  }

}
