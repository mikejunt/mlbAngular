import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copyright'
})
export class CopyrightPipe implements PipeTransform {

  transform(copystring): string[] {
    let arrayed = copystring.trim().split(" ");
    arrayed.shift();
    arrayed.splice(1,arrayed.length-2);
    return arrayed;
  }

}
