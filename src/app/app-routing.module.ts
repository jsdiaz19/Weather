import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [
  { path: '', component: WeatherComponent},
  {
    path: 'historial',
    loadChildren: () => import('./modules/historial/historial.module').then(m => m.HistorialModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./modules/favorite/favorite.module').then(m => m.FavoriteModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
