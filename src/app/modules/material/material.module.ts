import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule, MatIconModule } from '@angular/material';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }
