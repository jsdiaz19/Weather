import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Temperature } from 'src/app/models/temperature.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  themeSubject: Subject<boolean> = new Subject();
  citySubject: BehaviorSubject<
    Omit<City,"id" | "name" | "region"|"country">
    | null
    |Omit<City,"city" | "country_name" | "geoname_id">> = new BehaviorSubject<
    Omit<City,"id" | "name" | "region"|"country">
    | null
    |Omit<City,"city" | "country_name" | "geoname_id"> >(null);
  constructor() { }

  /**
   * Retorna observable para el cambio de tema
   * @returns
   */
  getSubjectTheme():Observable<boolean>{
    return this.themeSubject.asObservable();
  }

  /**
   * Notifica cambio de tema
   * @param isDark
   */
  setTheme(isDark:boolean){
    this.themeSubject.next(isDark);
  }

  /**
   * Notifica cambio de ciudad
   * @param city
   */
  updateCity(city:Omit<City,"id" | "name" | "region"|"country"> | Omit<City,"city" | "country_name" | "geoname_id">){
    this.citySubject.next(city);
  }

  /**
   * Retorna observable para el cambio de ciudad
   * @returns
   */
  getSubjectCity(){
    return this.citySubject.asObservable();
  }

  /**
   * Guarda historial de consultas en localstorage
   * @param city
   * @param resultRequest
   */
  saveSearch( city: string, resultRequest: Temperature){
    let searches: { name:string, response: Temperature}[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    searches.unshift({name:city, response: resultRequest});
    localStorage.setItem('recentSearches', JSON.stringify(searches));

  }

  /**
   * Retorna historial de consulta
   * @returns
   */
  getHistorial(): {name:string, response: Temperature}[]{
    let searches: {name:string, response: Temperature}[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    return searches;
  }

  /**
   * Retorna lista de ciudades favoritas
   * @returns
   */
  getFavorite(): {name:string}[] {
    let favorites: {name:string}[] = JSON.parse(localStorage.getItem('favoriteCity') || '[]');
    return favorites;
  }

  /**
   * Guarda ciudad como favorita
   * @param cityName
   */
  saveFavorite(cityName:string){
    let searches: { name:string}[] = JSON.parse(localStorage.getItem('favoriteCity') || '[]');
    const existCity = searches.filter((search:{name:string})=> search.name == cityName);
    if (existCity.length == 0) {
      searches.unshift({name:cityName});
      localStorage.setItem('favoriteCity', JSON.stringify(searches));
    }
  }

  /**
   * Borra ciudad de favoritos
   * @param cityName
   */
  deleteFavorite(cityName:string){
    let favorites: { name:string}[] = JSON.parse(localStorage.getItem('favoriteCity') || '[]');
    const newList = favorites.filter((item:{name:string})=> item.name!= cityName);
    localStorage.setItem('favoriteCity', JSON.stringify(newList));
  }

}
