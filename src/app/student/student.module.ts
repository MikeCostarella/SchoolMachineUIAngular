import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'list', component: StudentListComponent },
      { path: 'details/:id', component: StudentDetailsComponent }
    ])
 ],
  declarations: [StudentListComponent, StudentDetailsComponent]
})
export class StudentModule { }
