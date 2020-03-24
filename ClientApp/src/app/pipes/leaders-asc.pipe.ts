import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadersAsc'
})
export class LeadersAscPipe implements PipeTransform {

  transform(players: Object[], stat: string): Object[] {
    let tosort = [...players];
    tosort.sort((a, b) => { 
      if (parseFloat(b[stat]) < (parseFloat(a[stat]))){return 1 };
      if (parseFloat(b[stat]) === (parseFloat(a[stat]))){return 0 };
      if (parseFloat(b[stat]) > (parseFloat(a[stat]))){return -1 };
    })
    let leaders = tosort.splice(0,5);
    return leaders
  }

}
