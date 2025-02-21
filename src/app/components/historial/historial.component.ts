import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { Temperature } from 'src/app/models/temperature.model';
import { HttpService } from 'src/app/services/Http/http.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ViewSearchComponent } from '../view-search/view-search.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  displayedColumns: string[] = ['city', 'temperature','state','hour_local','actions'];
  dataSource = new MatTableDataSource<{name:string}>([]);
  historial: {name:string, response: Temperature}[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private session:SessionService, private http: HttpService, private router: Router, private dialog: MatDialog){}

  ngOnInit(){
    this.historial= this.session.getHistorial();
    this.dataSource.data= [...this.historial];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Realiza una consulta nuevamente de la ciudad seleccionada
   * @param cityName
   */
  gotToCity(cityName:string){
    this.http.searchCity(cityName).subscribe((city:Omit<City,"city" | "country_name" | "geoname_id">[])=> {
      this.session.updateCity(city[0]);
      this.router.navigate(['/']);
    })
  }

  /**
   * Abre visualizacion detallada de la consulta
   * @param request
   */
  openViewDetail(request:{ name: string; response: Temperature}){
    this.dialog.open(ViewSearchComponent, { data: request, width: '40%',
      maxWidth: '600px',
      height: 'auto',
      panelClass: 'custom-dialog'});
  }
}
