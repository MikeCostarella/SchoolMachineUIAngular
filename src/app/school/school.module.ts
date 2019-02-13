import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'list', component: SchoolListComponent },
      { path: 'details/:id', component: SchoolDetailsComponent },
    ])
  ],
  declarations: [SchoolListComponent, SchoolDetailsComponent]
})
export class SchoolModule { }
