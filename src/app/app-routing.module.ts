import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { HistorialComponent } from './components/historial/historial.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  { path: '', component: WeatherComponent},
  { path: 'historial', component: HistorialComponent},
  { path: 'favorite', component: FavoriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
