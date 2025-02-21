import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './components/favorite/favorite.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    FavoriteComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    TranslateModule.forChild(),
    FavoriteRoutingModule
  ]
})
export class FavoriteModule { }
