import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './components/historial/historial.component';
import { TemperatureUnitPipe} from 'src/app/pipe/TemperatureUnit/temperature-unit.pipe';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    TemperatureUnitPipe,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    TranslateModule.forChild(),
    HistorialRoutingModule
  ]
})
export class HistorialModule { }
