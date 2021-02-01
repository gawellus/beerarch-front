import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankcolor'
})
export class RankColorPipe implements PipeTransform {

private color: string;

  transform(rank): unknown {
    const y: number = +rank;
    if (y <= 2) {
      this.color = '#E40613';
    }
    else if (y <= 4) {
      this.color = '#FE9307';
    }
    else if (y <= 6) {
      this.color = '#FFD200';
    }
    else if (y <= 8) {
      this.color = '#BCEB00';
    }
    else {
      this.color = '#27A738';
    }
    return this.color;
  }

}
