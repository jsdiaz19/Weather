import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Temperature } from 'src/app/models/temperature.model';
import { environment } from 'src/environment/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = environment.BASE_URL;
  autoComplete: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private http: HttpClient, private session:SessionService) { }

  /**
   * Obtiene la ciudad actual basado en la ip
   * @returns
   */
  getCityCuurent():Observable<Omit<City,"id" | "name" | "region"|"country">>{
    let params= new HttpParams().set('q','auto:ip');
    return this.http.get<Omit<City,"id" | "name" | "region"|"country"> >(`${this.baseUrl}/ip.json`,{params}).pipe(shareReplay(1));
  }

  /**
   * Notifica cambio de texto en busqueda de ciudades
   * @param city
   */
  emitCitySearch(city:string):void{
    this.autoComplete.next(city);
  }

  /**
   * Valida la entrada del usuario para realizar consulta
   * @returns
   */
  getCities():Observable<Omit<City,"city" | "country_name" | "geoname_id">[]>{
    return this.autoComplete.asObservable().pipe(
      filter((input:string)=> input.length >2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText:string)=> {
        return this.searchCity(searchText);
      })
    )
  }

  /**
   * Obtiene lista de ciudades basada en la entrada del usuario
   * @param searchText
   * @returns
   */
  searchCity(searchText:string){
    let params= new HttpParams().set('q',searchText);
    return this.http.get<Omit<City,"city" | "country_name" | "geoname_id">[]>(`${this.baseUrl}/search.json`,{params});
  }

  /**
   * Consulta informacion del clima de la ciudad seleccionada
   * @param city
   * @returns
   */
  getCurrentWeather(city: Omit<City,"id" | "name" | "region"|"country"> | Omit<City,"city" | "country_name" | "geoname_id">): Observable<Temperature>{
    let params= new HttpParams().set('q', city.lat+','+city.lon);
    return this.http.get<Temperature>(`${this.baseUrl}/current.json`,{params}).pipe(
      tap((weather:Temperature)=> { this.session.saveSearch((city as any).city ?? (city as any).name ?? '', weather)})
    )
  }
}
