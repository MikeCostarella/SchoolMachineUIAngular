import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatIconModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';

import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolUpdateComponent } from './school-update/school-update.component';
import { SchoolDeleteComponent } from './school-delete/school-delete.component';

@NgModule({
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
      { path: 'create', component: SchoolCreateComponent },
      { path: 'delete/:id', component: SchoolDeleteComponent },
      { path: 'details/:id', component: SchoolDetailsComponent },
      { path: 'list', component: SchoolListComponent },
      { path: 'update/:id', component: SchoolUpdateComponent }
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
    MatSortModule,
  ],
  declarations: [
    SchoolListComponent,
    SchoolDetailsComponent,
    SchoolCreateComponent,
    SchoolUpdateComponent,
    SchoolDeleteComponent
  ]
})
export class SchoolModule { }
