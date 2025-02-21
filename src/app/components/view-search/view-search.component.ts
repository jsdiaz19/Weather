import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Temperature } from 'src/app/models/temperature.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TranslateService, TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-view-search',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule
  ],
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.scss']
})
export class ViewSearchComponent {
  private translate = Inject(TranslateService);
  constructor(private dialogRef: MatDialogRef<ViewSearchComponent>, @Inject(MAT_DIALOG_DATA) public data: { name: string; response: Temperature}){}
}
