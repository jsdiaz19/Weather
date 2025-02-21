import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureUnit',
  standalone:true
})
export class TemperatureUnitPipe implements PipeTransform {

  transform(value: number, unit: string): unknown {
    return `${value} ${unit}`;
  }

}
