import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild([
      { path: 'create', component: StudentCreateComponent },
      { path: 'delete/:id', component: StudentDeleteComponent },
      { path: 'details/:id', component: StudentDetailsComponent },
      { path: 'list', component: StudentListComponent },
      { path: 'update/:id', component: StudentUpdateComponent }
    ])
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
