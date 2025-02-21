import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  displayedColumns: string[] = ['Ciudad', 'Acciones'];
  dataSource = new MatTableDataSource<{name:string}>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private session:SessionService){}

  ngOnInit(){
    this.getFavorite();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Obtiene lista de ciudades favoritas
   */
  getFavorite(){
    const favorite:{name:string}[] = this.session.getFavorite();
    this.dataSource.data= [...favorite];
  }

  /**
   * Borra ciduad de lista de favoritos
   * @param cityName
   */
  deleteCity(cityName:string){
    this.session.deleteFavorite(cityName);
    this.getFavorite();
  }
}
