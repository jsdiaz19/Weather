import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';

@Pipe({
  name: 'isFavorite'
})
export class IsFavoritePipe implements PipeTransform {

  constructor(private session: SessionService){}

  /**
   * Valida si la ciudad esta marcada como favorito
   * @param value
   * @param args
   * @returns
   */
  transform(value: unknown, ...args: unknown[]): unknown {
    const favorites= this.session.getFavorite();
    const filterCity= favorites.filter((item:{name:string})=> item.name == value);
    if( filterCity.length>0) return 'favorite'
    return 'favorite_border'
  }

}
