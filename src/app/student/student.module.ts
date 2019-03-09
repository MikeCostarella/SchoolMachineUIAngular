import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatIconModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';

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
      { path: 'create', component: StudentCreateComponent },
      { path: 'delete/:id', component: StudentDeleteComponent },
      { path: 'details/:id', component: StudentDetailsComponent },
      { path: 'list', component: StudentListComponent },
      { path: 'update/:id', component: StudentUpdateComponent }
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
    StudentListComponent,
    StudentDetailsComponent,
    StudentCreateComponent,
    StudentUpdateComponent,
    StudentDeleteComponent
  ]
})
export class StudentModule { }
