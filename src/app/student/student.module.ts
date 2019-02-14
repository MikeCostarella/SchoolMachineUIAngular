import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentCreateComponent } from './student-create/student-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: StudentListComponent },
      { path: 'details/:id', component: StudentDetailsComponent }
    ])
 ],
  declarations: [StudentListComponent, StudentDetailsComponent, StudentCreateComponent]
})
export class StudentModule { }
