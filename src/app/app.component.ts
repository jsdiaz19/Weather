import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from './services/session/session.service';
import { HttpService } from './services/Http/http.service';
import { City } from './models/city.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  availableLangs: { code:string, name:string}[] = [{ code:'es', name:'español'}, { code:'en', name:'ingles'}];
  currentLng:string= '';
  currentCity:Omit<City,"id" | "name" | "region"|"country"> | Omit<City,"city" | "country_name" | "geoname_id"> | null = null;
  searchResults$ = this.http.getCities();
  isMobile:boolean = false;
  SubjectCity!: Subscription;
  SubjectTheme!: Subscription;
  constructor(private translate: TranslateService, private session: SessionService, private renderer: Renderer2, private http: HttpService, private router: Router, private breakpointObserver: BreakpointObserver){

    const availableLangs = this.availableLangs.map(lng=> lng.code);
    this.translate.addLangs(availableLangs);
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = availableLangs.includes(browserLang) ? browserLang : 'es';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.currentLng = defaultLang;

    this.SubjectCity = this.session.getSubjectCity().subscribe((city:Omit<City,"id" | "name" | "region"|"country"> | Omit<City,"city" | "country_name" | "geoname_id"> | null)=> {
      if( city == null) {
        this.getCurrentCity()
      }else{
        this.currentCity = city;
      }
    })

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit(){
    this.SubjectTheme = this.session.getSubjectTheme().subscribe((isDark:boolean)=> {
      this.setTheme(isDark);
    });

  }

  ngOnDestroy(){
    this.SubjectCity.unsubscribe();
    this.SubjectTheme.unsubscribe();
  }

  /**
   * Obtiene la ubicacion actual basado en la IP
   */
  getCurrentCity(){
    this.http.getCityCuurent().subscribe((currentCity:Omit<City,"id" | "name" | "region"|"country"> )=> {
      this.session.updateCity(currentCity);
      this.currentCity = currentCity;
    })
  }
  /**
   * Cambia el tema de la aplicacion
   * @param theme
   */
  setTheme(theme:boolean){
    if( !theme){
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');

    }else{
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    }

  }

  /**
   * Cambia el idioma de sistema
   * @param codeLng Codigo del lenguaje
   */
  setLng(codeLng:string){
    this.translate.use(codeLng);
    this.currentLng = codeLng;
  }

  /**
   * Inicia el autocompletado en la busquedad de ciudad
   * @param cityTarget
   */
  autoCompleteCity(cityTarget:Event){
    const search= (cityTarget.target as HTMLInputElement).value;
    this.http.emitCitySearch(search);
  }

  get cityName(): string {
    if (!this.currentCity) return '';
    return (this.currentCity as any).city ?? (this.currentCity as any).name ?? '';
  }

  /**
   * Actualiza la ciudad seleccionada por el usuario
   * @param city
   */
  selectCity(city: Omit<City,"city" | "country_name" | "geoname_id">){
    this.currentCity = city;
    this.session.updateCity(city);
    this.router.navigate(["/"])
  }

  /**
   * Agrega ciudad a favoritos
   * @param city
   * @param event
   */
  addFavorite(city:Omit<City, "city" | "country_name" | "geoname_id">, event:Event){
    this.session.saveFavorite(city.name);
  }

}
