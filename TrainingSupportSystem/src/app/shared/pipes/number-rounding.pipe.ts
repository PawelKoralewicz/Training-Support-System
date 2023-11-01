import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRounding'
})
export class NumberRoundingPipe implements PipeTransform {
  transform(value: number, roundingInterval: number): number {
    return Math.round(value / roundingInterval) * roundingInterval;
  }
}
