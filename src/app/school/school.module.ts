import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolCreateComponent } from './school-create/school-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: SchoolListComponent },
      { path: 'details/:id', component: SchoolDetailsComponent },
    ])
  ],
  declarations: [SchoolListComponent, SchoolDetailsComponent, SchoolCreateComponent]
})
export class SchoolModule { }
