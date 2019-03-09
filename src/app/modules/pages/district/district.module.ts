import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatIconModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../../../shared/shared.module';

import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictDetailsComponent } from './district-details/district-details.component';
import { DistrictCreateComponent } from './district-create/district-create.component';
import { DistrictUpdateComponent } from './district-update/district-update.component';
import { DistrictDeleteComponent } from './district-delete/district-delete.component';

@NgModule({
  declarations: [
    DistrictListComponent,
    DistrictDetailsComponent,
    DistrictCreateComponent,
    DistrictUpdateComponent,
    DistrictDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild([
      { path: 'create', component: DistrictCreateComponent },
      { path: 'delete/:id', component: DistrictDeleteComponent },
      { path: 'details/:id', component: DistrictDetailsComponent },
      { path: 'list', component: DistrictListComponent },
      { path: 'update/:id', component: DistrictUpdateComponent }
    ])
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DistrictModule { }
