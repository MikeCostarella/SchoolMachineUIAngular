import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild([
      { path: 'create', component: SchoolCreateComponent },
      { path: 'delete/:id', component: SchoolDeleteComponent },
      { path: 'details/:id', component: SchoolDetailsComponent },
      { path: 'list', component: SchoolListComponent },
      { path: 'update/:id', component: SchoolUpdateComponent }
    ])
  ],
  declarations: [SchoolListComponent, SchoolDetailsComponent, SchoolCreateComponent, SchoolUpdateComponent, SchoolDeleteComponent]
})
export class SchoolModule { }
